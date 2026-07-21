"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";

export default function Confetti() {
    useEffect(() => {
        confetti({
            particleCount: 180,
            spread: 120,
            origin: { y: 0.6 },
        });
    }, []);

    return null;
}