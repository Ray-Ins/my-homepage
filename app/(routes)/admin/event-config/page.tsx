import EventConfigForm from "@/components/EventConfigForm";

export default function AdminEventConfigPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Admin: Event Management</h1>
      <p className="text-gray-600 mb-8">
        Create new events for users to register. These events will be stored in
        the database and will be available for users to select during
        registration.
      </p>
      {/* <EventConfigForm /> */}
    </div>
  );
}
