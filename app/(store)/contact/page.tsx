import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import PageLayout from "@/components/shared/PageLayout";
import ContactForm from "./_components/ContactForm";

const contactInfo = [
    {
        icon: Mail,
        title: "Email",
        details: "hello@shopsphere.com",
        description: "We reply within 24 hours",
    },
    {
        icon: Phone,
        title: "Phone",
        details: "+91 8888-888-888",
        description: "Mon-Fri, 9 AM - 6 PM IST",
    },
    {
        icon: MapPin,
        title: "Location",
        details: "Punjab, India",
        description: "Visit us by appointment",
    },
    {
        icon: Clock,
        title: "Business Hours",
        details: "9:00 AM - 6:00 PM IST",
        description: "Closed on weekends & holidays",
    },
];

export default function ContactPage() {
    return (
        <PageLayout>
            {/* Header */}
            <div className="mb-10 max-w-2xl md:mb-14">
                <h1 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">
                    Get in Touch
                </h1>
                <p className="text-muted-foreground md:text-lg">
                    Have a question, feedback, or just want to say hello? We'd love to hear
                    from you. Fill out the form and we'll get back to you shortly.
                </p>
            </div>

            <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr]">
                {/* Contact Info Cards */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                    {contactInfo.map((item) => (
                        <Card key={item.title}>
                            <CardContent className="flex items-start gap-4 p-5">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/5">
                                    <item.icon className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">{item.title}</h3>
                                    <p className="mt-0.5 text-sm text-foreground">{item.details}</p>
                                    <p className="text-xs text-muted-foreground">{item.description}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Contact Form */}
                <div>
                    <Card>
                        <CardContent className="p-6 md:p-8">
                            <h2 className="mb-1 text-xl font-semibold">Send us a Message</h2>
                            <p className="mb-6 text-sm text-muted-foreground">
                                All fields are required unless marked optional.
                            </p>
                            <ContactForm />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </PageLayout>
    );
}
