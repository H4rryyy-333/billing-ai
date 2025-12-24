import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, Package } from "lucide-react";
import { useState } from "react";

interface Product {
  id: string;
  name: string;
  type: "product" | "service";
  price: number;
  stock: number | null;
}

const initialProducts: Product[] = [
  { id: "1", name: "Web Development Package", type: "service", price: 150000, stock: null },
  { id: "2", name: "Cloud Hosting - Annual", type: "service", price: 24000, stock: null },
  { id: "3", name: "Laptop Stand Premium", type: "product", price: 2500, stock: 45 },
  { id: "4", name: "Wireless Keyboard", type: "product", price: 3200, stock: 120 },
  { id: "5", name: "SEO Optimization", type: "service", price: 35000, stock: null },
  { id: "6", name: "USB-C Hub", type: "product", price: 1800, stock: 78 },
  { id: "7", name: "Mobile App Development", type: "service", price: 250000, stock: null },
  { id: "8", name: "Ergonomic Mouse", type: "product", price: 2200, stock: 65 },
];

export default function Products() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    type: "product" as "product" | "service",
    price: "",
    stock: "",
  });

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || product.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price) return;

    const product: Product = {
      id: Date.now().toString(),
      name: newProduct.name,
      type: newProduct.type,
      price: parseFloat(newProduct.price),
      stock: newProduct.type === "product" ? parseInt(newProduct.stock) || 0 : null,
    };

    setProducts([product, ...products]);
    setNewProduct({ name: "", type: "product", price: "", stock: "" });
    setDialogOpen(false);
  };

  return (
    <AppLayout>
      <div className="p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="opacity-0 animate-fade-in">
            <h1 className="text-3xl font-bold tracking-tight">Products & Services</h1>
            <p className="text-muted-foreground mt-1">
              Manage your product catalog and inventory
            </p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-2" variant="glow">
                <Plus className="h-4 w-4" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Product/Service</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter product or service name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select
                    value={newProduct.type}
                    onValueChange={(value: "product" | "service") =>
                      setNewProduct({ ...newProduct, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="product">Product</SelectItem>
                      <SelectItem value="service">Service</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price (₹)</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="Enter price"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  />
                </div>
                {newProduct.type === "product" && (
                  <div className="space-y-2">
                    <Label htmlFor="stock">Stock Quantity</Label>
                    <Input
                      id="stock"
                      type="number"
                      placeholder="Enter stock quantity"
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                    />
                  </div>
                )}
                <Button onClick={handleAddProduct} className="w-full" variant="glow">
                  Add {newProduct.type === "product" ? "Product" : "Service"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6 opacity-0 animate-fade-in" style={{ animationDelay: "50ms" }}>
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[150px]">
              <Package className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="product">Products</SelectItem>
              <SelectItem value="service">Services</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="metric-card opacity-0 animate-slide-up" style={{ animationDelay: "100ms" }}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Stock</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>
                    <Badge variant={product.type === "product" ? "default" : "secondary"}>
                      {product.type === "product" ? "Product" : "Service"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    ₹{product.price.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    {product.stock !== null ? (
                      <span className={product.stock < 20 ? "text-warning" : ""}>
                        {product.stock}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AppLayout>
  );
}
