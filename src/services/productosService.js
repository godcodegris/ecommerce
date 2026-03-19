const BASE_URL = "https://ecommerce-backend-production-e9f1.up.railway.app";

export async function getProductos() {
  const response = await fetch(`${BASE_URL}/products`);
  if (!response.ok) throw new Error("Error al cargar productos");
  return response.json();
}

export async function getProductoPorId(id) {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  if (!response.ok) throw new Error("Producto no encontrado");
  return response.json();
}

export async function createProducto(nuevoProducto) {
  const response = await fetch(`${BASE_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(nuevoProducto)
  });
  if (!response.ok) throw new Error("Error al crear producto");
  return response.json();
}

export async function updateProducto(id, datos) {
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos)
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error ${response.status}: ${errorText}`);
  }
  return response.json();
}

export async function deleteProducto(id) {
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error("Error al eliminar");
  return response.json();
}
