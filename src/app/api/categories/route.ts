import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
/* Forzar recarga de rutas */

export async function GET() {
    try {
        const categories = await prisma.category.findMany();
        return NextResponse.json(categories);
    } catch (error) {
        return NextResponse.json({ error: "No se pudieron obtener las categorías" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const category = await prisma.category.create({
            data: { name: data.name }
        });
        return NextResponse.json(category);
    } catch (error) {
        return NextResponse.json({ error: "No se pudo crear la categoría" }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) return NextResponse.json({ error: "ID no proporcionado" }, { status: 400 });

        // Check if category has products
        const productsCount = await prisma.product.count({
            where: { categoryId: id }
        });

        if (productsCount > 0) {
            return NextResponse.json(
                { error: "No se puede eliminar una categoría que contiene productos vinculados." },
                { status: 400 }
            );
        }

        await prisma.category.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Error al eliminar la categoría" }, { status: 500 });
    }
}
