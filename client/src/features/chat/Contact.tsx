import ProfilePicture from "@/components/custom/ProfilePicture";
import { Contact as IContact } from "./schema";
import { useChat } from "./ChatContext";

interface ContactProps {
  contact: IContact;
  callback?(): void;
}
export default function Contact({ contact, callback }: ContactProps) {
  const { selectUser } = useChat();
  return (
    <div
      onClick={() => {
        callback?.();
        selectUser(contact);
      }}
      className="flex gap-2 mt-4 items-center cursor-pointer"
    >
      <div>
        <ProfilePicture imgSize="h-12 w-12" user={contact} />
      </div>
      <div className="flex flex-col gap-1">
        <h1 className="">
          {contact.firstName} {contact.lastName}
        </h1>
        <h2 className="text-xs">{contact.email}</h2>
      </div>
    </div>
  );
}
