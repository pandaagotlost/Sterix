import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 })
    }

    // Make a request to Discord API to validate the token and get bot info
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

    // Get the guilds (servers) the bot is in
    const guildsResponse = await fetch("https://discord.com/api/v10/users/@me/guilds", {
      headers: {
        Authorization: `Bot ${token}`,
        "Content-Type": "application/json",
      },
    })

    if (!guildsResponse.ok) {
      return NextResponse.json({ error: "Failed to fetch guilds" }, { status: guildsResponse.status })
    }

    const guildsData = await guildsResponse.json()

    return NextResponse.json({
      bot: {
        id: botData.id,
        username: botData.username,
        avatar: botData.avatar,
        discriminator: botData.discriminator,
      },
      guilds: guildsData.map((guild: any) => ({
        id: guild.id,
        name: guild.name,
        icon: guild.icon,
        owner: guild.owner,
        permissions: guild.permissions,
      })),
    })
  } catch (error) {
    console.error("Discord auth error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
