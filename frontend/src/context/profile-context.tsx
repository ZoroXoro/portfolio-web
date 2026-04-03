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
  title: "Web & App Developer",
  bio: "",
  email: "harshworks20@gmail.com",
  phone: "+91 7039140235",
  location: "Mumbai, India",
  github: "https://github.com/Harsh-kamble",
  linkedin: "https://www.linkedin.com/in/harsh-kamble",
  whatsapp: "917039140235",
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
