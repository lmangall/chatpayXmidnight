import {HttpResponse} from "msw";
import {User} from "../../types/types";
import {createLeadUser} from "../createUsers";

interface GetUserRequestBody {
  userId: number;
  username: string;
}

// The leadUser here is only user as User for inviteeUser and normalUser, the leadUser is created with createLeadUser
const leadUser: Partial<User> = {
  id: 1,
  name: "Lead User",
  chats: [],
  has_profile: true,
};

const newUser: Partial<User> = {
  id: 2,
  name: "New User",
  chats: [],
  has_profile: false,
};

const inviteeUser: Partial<User> = {
  id: 3,
  name: "Invitee User",
  chats: [],
  has_profile: false,
};

const normalUser: Partial<User> = {
  id: 4,
  name: "Normal User",
  chats: [],
  has_profile: true,
};

inviteeUser.chats = [
  {
    lead_id: newUser.id!,
    agreed_users: [newUser.id!],
    name: "New User",
    id: 2,
    status: "pending",
    words: 50,
    users: [newUser as User], // Cast to User
  },
  {
    lead_id: leadUser.id!,
    agreed_users: [leadUser.id!],
    name: "Lead User",
    id: 1,
    status: "pending",
    words: 230,
    users: [leadUser as User], // Cast to User
  },
  {
    lead_id: normalUser.id!,
    agreed_users: [normalUser.id!],
    name: "Normal User",
    id: 4,
    status: "pending",
    words: 10,
    users: [normalUser as User], // Cast to User
  },
];

normalUser.chats = [
  {
    lead_id: normalUser.id!,
    agreed_users: [newUser.id!, leadUser.id!],
    name: "Normal User Lead Chat",
    id: 5,
    status: "pending",
    words: 100,
    users: [normalUser as User, newUser as User, leadUser as User], // Cast to User
  },
  {
    lead_id: leadUser.id!,
    agreed_users: [normalUser.id!],
    name: "Lead User Lead Chat",
    id: 6,
    status: "pending",
    words: 200,
    users: [leadUser as User, normalUser as User], // Cast to User
  },
  {
    lead_id: newUser.id!,
    agreed_users: [normalUser.id!],
    name: "New User Lead Chat",
    id: 7,
    status: "pending",
    words: 150,
    users: [newUser as User, normalUser as User], // Cast to User
  },
];

const getLeadUser = () => {
  const numChats = parseInt(import.meta.env.VITE_NUM_CHATS || "1", 10);
  return createLeadUser(numChats);
};

export const getUserResolver = async ({request}: {request: Request}) => {
  const json = await request.json();

  if (!json || typeof json !== "object") {
    return new HttpResponse("Invalid request body", {
      status: 400,
      headers: {"Content-Type": "application/json"},
    });
  }
  const body = json as GetUserRequestBody;
  const {userId} = body;
  switch (userId) {
    case 1:
      return HttpResponse.json(getLeadUser());
    case 2:
      return HttpResponse.json(newUser);
    case 3:
      return HttpResponse.json(inviteeUser);
    case 4:
      return HttpResponse.json(normalUser);
    default:
      return new HttpResponse("User not found", {
        status: 404,
        headers: {"Content-Type": "application/json"},
      });
  }
};
