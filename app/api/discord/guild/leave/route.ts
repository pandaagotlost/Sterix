import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { token, guildId } = await request.json()

    if (!token || !guildId) {
      return NextResponse.json({ error: "Token and guild ID are required" }, { status: 400 })
    }

    // Get bot ID first
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

    // Leave the guild
    const leaveResponse = await fetch(`https://discord.com/api/v10/users/@me/guilds/${guildId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bot ${token}`,
        "Content-Type": "application/json",
      },
    })

    if (!leaveResponse.ok) {
      return NextResponse.json({ error: "Failed to leave guild" }, { status: leaveResponse.status })
    }

    return NextResponse.json({
      success: true,
      message: "Successfully left the guild",
    })
  } catch (error) {
    console.error("Discord leave guild error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
