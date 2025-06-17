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

    // Fetch guild details
    const guildResponse = await fetch(`https://discord.com/api/v10/guilds/${guildId}`, {
      headers: {
        Authorization: `Bot ${token}`,
        "Content-Type": "application/json",
      },
    })

    if (!guildResponse.ok) {
      return NextResponse.json({ error: "Failed to fetch guild details" }, { status: guildResponse.status })
    }

    const guildData = await guildResponse.json()

    // Fetch guild members count
    const membersResponse = await fetch(`https://discord.com/api/v10/guilds/${guildId}?with_counts=true`, {
      headers: {
        Authorization: `Bot ${token}`,
        "Content-Type": "application/json",
      },
    })

    if (!membersResponse.ok) {
      return NextResponse.json({ error: "Failed to fetch guild members" }, { status: membersResponse.status })
    }

    const membersData = await membersResponse.json()

    return NextResponse.json({
      id: guildData.id,
      name: guildData.name,
      icon: guildData.icon,
      owner_id: guildData.owner_id,
      approximate_member_count: membersData.approximate_member_count,
      approximate_presence_count: membersData.approximate_presence_count,
      description: guildData.description,
      features: guildData.features,
    })
  } catch (error) {
    console.error("Discord guild fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
