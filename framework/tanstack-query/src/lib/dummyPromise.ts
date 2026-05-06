interface TeamMember {
  id: number;
  name: string;
  details: string;
  image: string;
}

const persons: TeamMember[] = [
  {
    id: 1,
    name: "John Doe",
    details:
      "Frontend developer who enjoys building clean and accessible user interfaces.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    name: "Jane Smith",
    details:
      "Product designer focused on user experience and modern visual systems.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    name: "Michael Brown",
    details: "Backend engineer working on scalable APIs and cloud services.",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 4,
    name: "Emily Johnson",
    details: "Mobile app developer creating smooth cross-platform experiences.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 5,
    name: "David Wilson",
    details: "Data analyst turning raw numbers into useful business insights.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 6,
    name: "Sophia Martinez",
    details: "UI engineer who loves crafting polished, responsive components.",
    image:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 7,
    name: "James Anderson",
    details:
      "DevOps specialist automating deployments and infrastructure workflows.",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 8,
    name: "Olivia Taylor",
    details:
      "Content strategist building clear messaging for digital products.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 9,
    name: "Daniel Thomas",
    details:
      "Full-stack developer shipping features across frontend and backend.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 10,
    name: "Ava White",
    details:
      "QA engineer ensuring reliable releases through automation and testing.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80",
  },
];

const getAllTeamMembers = (): Promise<TeamMember[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(persons);
    }, 1000);
  });
};

const getTeamMembersById = (id: number): Promise<TeamMember | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const person = persons.find((p) => p.id === id) || null;
      resolve(person);
    }, 1000);
  });
};

export { getAllTeamMembers, getTeamMembersById };
