import { Button, DarkThemeToggle, Flowbite, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import CardLoading from "./CardLoading";
import CardComponent from "./CardComponent";
import CreateProductForm from "./CreateProductForm";

// Defining types for Status and Product
type Status = "idle" | "loading" | "success" | "error";
type Product = {
    readonly id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
};

// Main component
const CardRender = () => {
    const [openModal, setOpenModal] = useState(false); // Controls if the modal is open
    const [status, setStatus] = useState<Status>("idle"); // Tracks the status of fetching products
    const [products, setProducts] = useState<Product[]>([]); // Stores the fetched products
    const [dataForm, setDataForm] = useState<Product>(); // Stores the data from the form

    // Fetching products
    useEffect(() => {
        setStatus("loading");
        fetch("https://fakestoreapi.com/products")
            .then((response) => response.json())
            .then((data) => {
                setStatus("success");
                setProducts(data);
            })
            .catch(() => {
                setStatus("error");
            });
    }, []);

    // Function to get data from the form
    function getDataForm(product: Product) {
        setDataForm(product);
    }

    // Function to create a new product
    const createProduct = () => {
        fetch("https://fakestoreapi.com/products", {
            method: "POST",
            body: JSON.stringify(dataForm),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setProducts([...products, data]); // Adding the new product to the list
            })
            .catch((error) => {
                console.error("Error:", error);
            });
        setOpenModal(false); // Closing the modal after creating the product
    };

    // Rendering the component
    return (
        <Flowbite>
            <div className="container mt-5">
                <div className="flex items-center justify-between bg-gray-100 p-3 dark:bg-gray-800">
                    <DarkThemeToggle />
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                        My Products
                    </h1>
                    <Button onClick={() => setOpenModal(true)}>Add New Product</Button>
                    <Modal show={openModal} onClose={() => setOpenModal(false)}>
                        <Modal.Header>Add Product Form</Modal.Header>
                        <Modal.Body>
                            <div className="space-y-6">
                                <CreateProductForm getDataForm={getDataForm} />
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="submit" onClick={() => createProduct()}>
                                Add Product
                            </Button>
                            <Button color="gray" onClick={() => setOpenModal(false)}>
                                Cancel
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>

                <div>
                    {/* Displaying loading, error, or product list based on the status */}
                    {status === "loading" ? (
                        <CardLoading />
                    ) : status === "error" ? (
                        <div className="flex h-dvh items-center justify-center">
                            <h1 className="text-6xl font-bold capitalize text-red-500">
                                No Data Available
                            </h1>
                        </div>
                    ) : (
                        <div className="my-6 grid grid-cols-1 gap-5 md:grid-cols-2  lg:grid-cols-4 justify-center">
                            {products.map((product) => (
                                <CardComponent
                                    key={product.id}
                                    title={product.title}
                                    price={product.price}
                                    description={product.description}
                                    img={product.image}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Flowbite>
    );
};

export default CardRender;
