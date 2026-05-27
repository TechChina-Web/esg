"use client";
import React from "react";
import { TeamSection } from "@/components/ui/team-section";
import { Linkedin } from "lucide-react";
import { Topbar } from "@/components/app/topbar";

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Dana Guo",
      designation: "Team Member",
      imageSrc:
        "https://media.licdn.com/dms/image/v2/D4D03AQGoqbdZnbibmg/profile-displayphoto-scale_200_200/B4DZjhlYEuGQAo-/0/1756131344944?e=2147483647&v=beta&t=L92lKP42eU3uKDMlJ7B91yJOkKEo13ZyKdYfIi-Abd4",
      socialLinks: [{ icon: Linkedin, href: "#" }],
    },
    {
      name: "Oscar Xiao",
      designation: "Team Member",
      imageSrc:
        "https://media.licdn.com/dms/image/v2/D4E03AQFgGCCpmUj9rw/profile-displayphoto-scale_200_200/B4EZfzg3E2HEAY-/0/1752137169585?e=2147483647&v=beta&t=StuMa7JVWEFm7Xn7xELWUKQKrnCUFtOSfdhoOKJp_XU",
      socialLinks: [{ icon: Linkedin, href: "#" }],
    },
    {
      name: "Taili Li",
      designation: "Team Member",
      imageSrc:
        "https://media.licdn.com/dms/image/v2/D5603AQFagoNzcFTJtQ/profile-displayphoto-scale_200_200/B56ZjVRkuXHQAc-/0/1755924812654?e=2147483647&v=beta&t=qhkWBOxGa7W07hJniEPTKDGA2vIrgggyIPIM7IoZWCc",
      socialLinks: [{ icon: Linkedin, href: "#" }],
    },
    {
      name: "Jim",
      designation: "Team Member",
      imageSrc: "https://via.placeholder.com/200",
      socialLinks: [{ icon: Linkedin, href: "#" }],
    },
    {
      name: "Mike Zhong",
      designation: "Team Member",
      imageSrc: "https://via.placeholder.com/200",
      socialLinks: [{ icon: Linkedin, href: "#" }],
    },
  ];

  return (
    <div className="min-h-screen">
      <Topbar title="About Us" subtitle="Meet the team behind the platform" />
      <TeamSection
        title={
          <>
            The people driving{" "}
            <span className="text-gradient-esg">net-zero</span> forward.
          </>
        }
        description="A cross-functional group of sustainability analysts, engineers, and product specialists dedicated to accelerating HSBC's journey to net zero."
        members={teamMembers}
      />
    </div>
  );
}
