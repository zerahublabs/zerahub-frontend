"use client";
import { SidebarAction } from "@/components/ui/sidebar";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { WalletIcon } from "lucide-react";
import React from "react";

export default function Wallet() {
  const { open } = useAppKit();
  const { isConnected } = useAppKitAccount();

  if (!isConnected) {
    return (
      <SidebarAction
        icon={<WalletIcon />}
        label={"Connect Wallet"}
        onClick={() => open({ view: "Connect" })}
      />
    );
  }

  return (
    <SidebarAction
      icon={<WalletIcon />}
      label={"My Wallet"}
      onClick={() => open({ view: "Account" })}
    />
  );
}
