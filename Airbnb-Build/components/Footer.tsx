"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import ClientOnly from "./ClientOnly";
import FooterColumn from "@/components/FooterColumn";

type Props = {};

function Footer({}: Props) {
  const [country, setCountry] = useState("United States");

  const itemData = [
    ["ABOUT", "Newsroom", "Learn about new features", "Letter from our founders", "Careers", "Investors"],
    ["Support", "Help Center", "AirCover", "Cancellation options", "Safety information", "Report a neighborhood concern"],
    ["Community", "Newsroom", "Learn about new features", "Letter from our founders", "Careers", "Investors"],
    ["Hosting","Try hosting","AirCover for Hosts","Explore hosting resources","Safety information","How to host responsibly"],
  ];

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const res = await fetch(`https://extreme-ip-lookup.com/json/?key=your_valid_key_here`);
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.statusText}`);
        }
        const data = await res.json();
        setCountry(data.country);
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    };
  
    fetchCountry();
  }, []);

  const footerColumns = itemData.map((item, index) => (
    <FooterColumn key={index} index={index} data={item} />
  ))

  return (
    <ClientOnly>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-y-10 px-32 py-14 bg-gray-100 text-gray-600 overflow-x-hidden">
        {footerColumns}
        <p className="text-sm">{country}</p>
      </div>
    </ClientOnly>
  );
}

export default Footer;
