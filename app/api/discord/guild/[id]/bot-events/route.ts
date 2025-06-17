import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get("token")
    const guildId = params.id

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 })
    }

    if (!guildId) {
      return NextResponse.json({ error: "Guild ID is required" }, { status: 400 })
    }

    // First, get the bot's user ID
    const botResponse = await fetch("https://discord.com/api/v10/users/@me", {
      headers: {
        Authorization: `Bot ${token}`,
        "Content-Type": "application/json",
      },
    })

    if (!botResponse.ok) {
      return NextResponse.json({ error: "Invalid token or API error" }, { status: botResponse.status })
    }

    const botData = await botResponse.json()
    const botId = botData.id

    // Fetch audit logs specifically related to the bot
    const auditLogsResponse = await fetch(`https://discord.com/api/v10/guilds/${guildId}/audit-logs?limit=50`, {
      headers: {
        Authorization: `Bot ${token}`,
        "Content-Type": "application/json",
      },
    })

    if (!auditLogsResponse.ok) {
      return NextResponse.json({ error: "Failed to fetch audit logs" }, { status: auditLogsResponse.status })
    }

    const auditLogsData = await auditLogsResponse.json()

    // Filter logs for events related to the bot
    const botEvents = auditLogsData.audit_log_entries
      .filter(
        (entry: any) =>
          entry.target_id === botId ||
          (entry.changes &&
            entry.changes.some(
              (change: any) =>
                change.new_value && typeof change.new_value === "string" && change.new_value.includes(botId),
            )),
      )
      .map((entry: any) => {
        // Get the user who performed the action
        const user = auditLogsData.users.find((u: any) => u.id === entry.user_id)

        return {
          id: entry.id,
          actionType: entry.action_type,
          userId: entry.user_id,
          userName: user
            ? `${user.username}${user.discriminator !== "0" ? `#${user.discriminator}` : ""}`
            : "Unknown User",
          changes: entry.changes || [],
          options: entry.options || {},
          reason: entry.reason || null,
          createdAt: new Date(Number.parseInt(entry.id) / 4194304 + 1420070400000).toISOString(),
        }
      })

    // Also fetch recent channel messages where the bot was mentioned
    // Note: This would require additional permissions and is limited by Discord's API
    // For simplicity, we'll return just the audit log events

    return NextResponse.json({
      botEvents,
      botId,
    })
  } catch (error) {
    console.error("Discord bot events fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
