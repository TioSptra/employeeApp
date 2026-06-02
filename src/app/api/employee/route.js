export async function POST(request) {
    const body = await request.json();
    if (!body) {
        return new Response("Invalid data", { status: 400 });
    }
    console.log("received employee data from client");
    console.log(body);
    return new Response(JSON.stringify({
        success : true,
        message : "Employee data received successfully",
        Employee : body
    }), {
        headers: {
            "Content-Type": "application/json"
        }
    });
}