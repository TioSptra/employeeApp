import pool from "@/lib/db";

export async function DELETE(request, { params }){
    try{
        const { id } = await params;
        await pool.query("DELETE FROM employees WHERE id = $1", [id]);

        return Response.json({
            success: true,
            message: "Employee deleted",
    });
    } catch (error) {
        console.error("Error deleting employee:", error);
        return new Response(JSON.stringify({ error: "Failed to delete employee" }), {
            status: 500
        });
    }
}

export async function PUT(request, { params }){
    try{
        const { id } = await params;
        const body = await request.json();
        const { name, email, division} = body;
        await pool.query("UPDATE employees SET name = $1, email = $2, division = $3 WHERE id = $4", [name, email, division, id]);

        return Response.json({
            success: true,
            message: "Employee updated",
    });
    } catch (error) {
        console.error("Error updating employee:", error);
        return new Response(JSON.stringify({ error: "Failed to update employee" }), {
            status: 500
        });
    }
}