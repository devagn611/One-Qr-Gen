"use client";
import { QrCode, IndianRupee, Landmark, Link as LinkIcon, User, Text } from "lucide-react";
import Link from "next/link";

const features = [
	{
		name: "UPI QR Generator",
		href: "/upi",
		description: "Create QR codes for any UPI ID.",
		icon: IndianRupee,
		color: "bg-blue-500",
	},
	{
		name: "Bank Account QR Generator",
		href: "/upiaccount",
		description: "Generate QR codes for bank accounts.",
		icon: Landmark,
		color: "bg-green-500",
	},
	{
		name: "vCard QR Generator",
		href: "/vcard",
		description: "Share contact details with a vCard QR.",
		icon: User,
		color: "bg-yellow-500",
	},
	{
		name: "URL QR Generator",
		href: "/url",
		description: "Create QR codes for any website URL.",
		icon: LinkIcon,
		color: "bg-red-500",
	},
	{
		name: "Unique Text QR Generator",
		href: "/unique",
		description: "Encode any text into a QR code.",
		icon: Text,
		color: "bg-purple-500",
	},
];

export default function Home() {
	return (
		<div className="text-center">
			<div className="flex items-center justify-center gap-2">
				<QrCode className="w-12 h-12 text-blue-600" />
				<h1 className="text-5xl font-extrabold tracking-tight">
					One-Qr-Gen
				</h1>
			</div>
			<p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
				Your all-in-one solution for creating custom QR codes. Fast, easy, and highly customizable.
			</p>
			<div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
				{features.map((feature) => (
					<Link key={feature.name} href={feature.href} className="block p-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
						<div className="flex flex-col items-center">
            <div className={`${feature.color} rounded-lg w-12 h-12 flex items-center justify-center mb-4`}>
							<feature.icon className="w-6 h-6 text-white" />
						</div>
						<h3 className="text-xl font-bold text-zinc-800 dark:text-white">{feature.name}</h3>
						<p className="mt-2 text-zinc-600 dark:text-zinc-400">{feature.description}</p>
            </div>
					</Link>
				))}
			</div>
		</div>
	);
}
