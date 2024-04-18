'use client'

export default function SwiperPage() {

    //funcion que retorna una tarjeta para el producto
    //por cada caja calcular la distancia con el left
    const content = (product, index) => (
        <div
            key={product.id}
            className="p-4 h-[120px] w-[150px] text-black bg-slate-200 border border-1 absolute"
            style={{left: `${index * 170}px` }}
            >
                <p>{product.name}</p>
            </div>
    );

    const products = [
        { id: '1', name: 'Producto 1'},
        { id: '2', name: 'Producto 2'},
        { id: '3', name: 'Producto 3'},
        { id: '4', name: 'Producto 4'},
        { id: '5', name: 'Producto 5'},
        { id: '6', name: 'Producto 6'},
        { id: '7', name: 'Producto 7'},
        { id: '8', name: 'Producto 8'},
        { id: '9', name: 'Producto 9'},
        { id: '10', name: 'Producto 10'}

    ];

    return(
        <div className="py-14 px-4 w-full">
            <h1 className="mb-6">Este es un ejemplo de slider</h1>
            <div
                className="overflow-x-auto w-full relative h-[120px]"
                >
                    {products.map((product, index) => {
                        return content(product, index);
                    })}
                </div>
        </div>
    );
}