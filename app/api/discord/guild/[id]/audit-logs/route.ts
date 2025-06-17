import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get("token")
    const guildId = params.id
    const limit = searchParams.get("limit") || "10"

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 })
    }

    if (!guildId) {
      return NextResponse.json({ error: "Guild ID is required" }, { status: 400 })
    }

    // Fetch audit logs
    const auditLogsResponse = await fetch(`https://discord.com/api/v10/guilds/${guildId}/audit-logs?limit=${limit}`, {
      headers: {
        Authorization: `Bot ${token}`,
        "Content-Type": "application/json",
      },
    })

    if (!auditLogsResponse.ok) {
      return NextResponse.json(
        {
          error: "Failed to fetch audit logs",
          status: auditLogsResponse.status,
          statusText: auditLogsResponse.statusText,
        },
        { status: auditLogsResponse.status },
      )
    }

    const auditLogsData = await auditLogsResponse.json()

    // Process and format the audit logs
    const formattedLogs = auditLogsData.audit_log_entries.map((entry: any) => {
      // Get the user who performed the action
      const user = auditLogsData.users.find((u: any) => u.id === entry.user_id)

      // Get the target of the action if available
      let target = null
      if (entry.target_id) {
        target = auditLogsData.users.find((u: any) => u.id === entry.target_id)
      }

      return {
        id: entry.id,
        actionType: entry.action_type,
        userId: entry.user_id,
        userName: user
          ? `${user.username}${user.discriminator !== "0" ? `#${user.discriminator}` : ""}`
          : "Unknown User",
        targetId: entry.target_id,
        targetName: target
          ? `${target.username}${target.discriminator !== "0" ? `#${target.discriminator}` : ""}`
          : null,
        changes: entry.changes || [],
        options: entry.options || {},
        reason: entry.reason || null,
        createdAt: new Date(Number.parseInt(entry.id) / 4194304 + 1420070400000).toISOString(),
      }
    })

    return NextResponse.json({
      auditLogs: formattedLogs,
      users: auditLogsData.users,
    })
  } catch (error) {
    console.error("Discord audit logs fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
