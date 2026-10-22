"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface Profile {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  whatsapp: string;
  resumeUrl: string;
}

const defaults: Profile = {
  name: "Harsh Kamble",
  title: "Full-Stack Developer · Aspiring AI Engineer",
  bio: "",
  email: "harshworks20@gmail.com",
  phone: "",
  location: "Mumbai, India",
  github: "https://github.com/ZoroXoro",
  linkedin: "https://www.linkedin.com/in/harsh-kamble-xzro/",
  whatsapp: "",
  resumeUrl: "",
};

const ProfileContext = createContext<Profile>(defaults);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile>(defaults);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_ADMIN_API_URL}/profile`)
      .then((res) => (res.ok ? res.json() : {}))
      .then((data: Partial<Profile>) => {
        if (data && Object.keys(data).length > 0) {
          setProfile((prev) => ({ ...prev, ...data }));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <ProfileContext.Provider value={profile}>{children}</ProfileContext.Provider>
  );
}

export function useProfile() {
  return useContext(ProfileContext);
}
