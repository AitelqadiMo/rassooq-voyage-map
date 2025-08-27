import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AddressBook = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Address Book</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Saved addresses management</p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default AddressBook;