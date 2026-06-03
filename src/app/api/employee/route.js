import pool from "@/lib/db";

export async function POST(request) {
    try {
        const body = await request.json();
        
        if (!body) {
            return new Response("Invalid data", { status: 400 });
        }

        const { name, email, division } = body;

        const result = await pool.query(
            `INSERT INTO employees (name,email,division) Values ($1,$2,$3) RETURNING *`,
            [name, email, division]
        );

        return Response.json({
            success: true,
            employee: result.rows[0]
        });
    } catch (error) {
        console.error("API Error:", error);
        return Response.json(
            { error: error.message },
            { status: 500 }
        );
    }
}

export async function GET(){
    try{
        const result = await pool.query(`Select * from employees order by id desc`);
        return Response.json(result.rows);
    } catch (error) {
        console.error("API Error:", error);
        return Response.json(
            { error: error.message },
            { status: 500 }
        );
    }
}