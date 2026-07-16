"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

// Register useGSAP plugin
gsap.registerPlugin(useGSAP);

interface Piece {
  id: number;
  left: number; // column index (0 to 23)
  width: number; // width in column units
  height: number; // height in row units
  bottomRow: number; // row index where it lands (0 is bottom)
}

type CycleType = "fin" | "random";

const COLUMNS = 24; // 24 columns density
const ROWS = 30; // 30 rows density
const BLOCK_SIZE = 16; // 16px block size

// Original coordinates map for the pixel-art shark fin (16x20 space grid)
const sharkFinMatrix = [
  // Row 0 (bottom-most row of the logo)
  { c: 0, r: 0 }, { c: 1, r: 0 }, { c: 2, r: 0 }, { c: 3, r: 0 }, { c: 4, r: 0 }, { c: 5, r: 0 }, { c: 6, r: 0 }, { c: 7, r: 0 }, { c: 8, r: 0 }, { c: 9, r: 0 }, { c: 10, r: 0 }, { c: 11, r: 0 }, { c: 12, r: 0 }, { c: 13, r: 0 },
  // Row 1
  { c: 1, r: 1 }, { c: 2, r: 1 }, { c: 3, r: 1 }, { c: 4, r: 1 }, { c: 5, r: 1 }, { c: 6, r: 1 }, { c: 7, r: 1 }, { c: 8, r: 1 }, { c: 9, r: 1 }, { c: 10, r: 1 }, { c: 11, r: 1 }, { c: 12, r: 1 }, { c: 13, r: 1 }, { c: 14, r: 1 },
  // Row 2
  { c: 2, r: 2 }, { c: 3, r: 2 }, { c: 4, r: 2 }, { c: 5, r: 2 }, { c: 6, r: 2 }, { c: 7, r: 2 }, { c: 8, r: 2 }, { c: 9, r: 2 }, { c: 10, r: 2 }, { c: 11, r: 2 }, { c: 12, r: 2 }, { c: 13, r: 2 }, { c: 14, r: 2 },
  // Row 3
  { c: 3, r: 3 }, { c: 4, r: 3 }, { c: 5, r: 3 }, { c: 6, r: 3 }, { c: 7, r: 3 }, { c: 8, r: 3 }, { c: 9, r: 3 }, { c: 10, r: 3 }, { c: 11, r: 3 }, { c: 12, r: 3 }, { c: 13, r: 3 },
  // Row 4
  { c: 4, r: 4 }, { c: 5, r: 4 }, { c: 6, r: 4 }, { c: 7, r: 4 }, { c: 8, r: 4 }, { c: 9, r: 4 }, { c: 10, r: 4 }, { c: 11, r: 4 }, { c: 12, r: 4 },
  // Row 5
  { c: 5, r: 5 }, { c: 6, r: 5 }, { c: 7, r: 5 }, { c: 8, r: 5 }, { c: 9, r: 5 }, { c: 10, r: 5 }, { c: 11, r: 5 },
  // Row 6
  { c: 6, r: 6 }, { c: 7, r: 6 }, { c: 8, r: 6 }, { c: 9, r: 6 }, { c: 10, r: 6 },
  // Row 7 (wave peak)
  { c: 7, r: 7 }, { c: 8, r: 7 },
  // Row 8
  { c: 8, r: 8 },

  // Row 9 (wedge gap is above the wave and below the top fin. Top fin starts at Row 9)
  { c: 7, r: 9 }, { c: 8, r: 9 }, { c: 9, r: 9 }, { c: 10, r: 9 }, { c: 11, r: 9 }, { c: 12, r: 9 }, { c: 13, r: 9 },
  // Row 10
  { c: 7, r: 10 }, { c: 8, r: 10 }, { c: 9, r: 10 }, { c: 10, r: 10 }, { c: 11, r: 10 }, { c: 12, r: 10 },
  // Row 11
  { c: 7, r: 11 }, { c: 8, r: 11 }, { c: 9, r: 11 }, { c: 10, r: 11 }, { c: 11, r: 11 },
  // Row 12
  { c: 6, r: 12 }, { c: 7, r: 12 }, { c: 8, r: 12 }, { c: 9, r: 12 }, { c: 10, r: 12 },
  // Row 13
  { c: 6, r: 13 }, { c: 7, r: 13 }, { c: 8, r: 13 }, { c: 9, r: 13 },
  // Row 14
  { c: 6, r: 14 }, { c: 7, r: 14 }, { c: 8, r: 14 },
  // Row 15
  { c: 5, r: 15 }, { c: 6, r: 15 }, { c: 7, r: 15 },
  // Row 16
  { c: 5, r: 16 }, { c: 6, r: 16 },
  // Row 17
  { c: 5, r: 17 }, { c: 6, r: 17 },
  // Row 18
  { c: 5, r: 18 },
  // Row 19 (fin tip)
  { c: 5, r: 19 }
];

// Helper to scale coordinates matrix by 1.5x with solid interpolation (nearest neighbor)
// Original 15x20 shape maps perfectly to a dense 22.5x30 block shape inside our 24x30 grid
const getScaledMatrix = () => {
  const scaled: { c: number; r: number }[] = [];
  const visited = new Set<string>();
  const scaleFactor = 1.5;

  sharkFinMatrix.forEach((cell) => {
    const startC = Math.floor(cell.c * scaleFactor);
    const endC = Math.ceil((cell.c + 1) * scaleFactor);
    
    const startR = Math.floor(cell.r * scaleFactor);
    const endR = Math.ceil((cell.r + 1) * scaleFactor);

    for (let nc = startC; nc < endC; nc++) {
      for (let nr = startR; nr < endR; nr++) {
        const key = `${nc},${nr}`;
        if (!visited.has(key)) {
          visited.add(key);
          scaled.push({ c: nc, r: nr });
        }
      }
    }
  });

  return scaled;
};

const scaledSharkFin = getScaledMatrix();

export default function TetrisBrutalista() {
  const [pieces, setPieces] = useState<Piece[]>([]);
  const [cycle, setCycle] = useState<CycleType>("fin");
  
  const colHeightsRef = useRef<number[]>(Array(COLUMNS).fill(0));
  const nextIdRef = useRef<number>(1);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const activeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const activeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isResettingRef = useRef<boolean>(false);

  // Main state machine for alternating infinite loops
  useEffect(() => {
    // Clear any pending timers on cycle change
    if (activeIntervalRef.current) clearInterval(activeIntervalRef.current);
    if (activeTimeoutRef.current) clearTimeout(activeTimeoutRef.current);
    isResettingRef.current = false;

    if (cycle === "fin") {
      // CICLO A: Rain of blocks assembling into the Shark Fin
      const shuffledFin = [...scaledSharkFin].sort(() => Math.random() - 0.5);
      let index = 0;

      activeIntervalRef.current = setInterval(() => {
        if (isResettingRef.current) return;

        if (index >= shuffledFin.length) {
          // All shape components spawned. Wait 4s for appreciation, then reset and switch to random
          clearInterval(activeIntervalRef.current!);
          activeTimeoutRef.current = setTimeout(() => {
            triggerReset(() => {
              setCycle("random");
            });
          }, 4000);
          return;
        }

        // Spawn 2 blocks at a time to build the 1.5x scaled fin shape faster and more dynamically
        const batchSize = 2;
        const newPiecesToAdd: Piece[] = [];

        for (let i = 0; i < batchSize && index < shuffledFin.length; i++) {
          const cell = shuffledFin[index];
          newPiecesToAdd.push({
            id: nextIdRef.current++,
            left: cell.c,
            width: 1,
            height: 1,
            bottomRow: cell.r,
          });
          index++;
        }

        setPieces((prev) => [...prev, ...newPiecesToAdd]);
      }, 35); // Fast drop rhythm
    } else {
      // CICLO B: Random Tetris stacking
      let piecesDropped = 0;
      colHeightsRef.current = Array(COLUMNS).fill(0);

      activeIntervalRef.current = setInterval(() => {
        if (isResettingRef.current) return;

        // Reset after 40 pieces or if grid gets full
        if (piecesDropped >= 40) {
          clearInterval(activeIntervalRef.current!);
          activeTimeoutRef.current = setTimeout(() => {
            triggerReset(() => {
              setCycle("fin");
            });
          }, 2000);
          return;
        }

        const shapes = [
          { w: 1, h: 1 },
          { w: 2, h: 1 },
          { w: 1, h: 2 },
          { w: 2, h: 2 },
          { w: 3, h: 1 },
        ];

        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        const maxCol = COLUMNS - shape.w;
        const colIndex = Math.floor(Math.random() * (maxCol + 1));

        const landingRow = Math.max(...colHeightsRef.current.slice(colIndex, colIndex + shape.w));

        // Reset early if blocks exceed maximum height
        if (landingRow + shape.h > ROWS) {
          clearInterval(activeIntervalRef.current!);
          triggerReset(() => {
            setCycle("fin");
          });
          return;
        }

        const targetHeight = landingRow + shape.h;
        for (let i = colIndex; i < colIndex + shape.w; i++) {
          colHeightsRef.current[i] = targetHeight;
        }

        const newPiece: Piece = {
          id: nextIdRef.current++,
          left: colIndex,
          width: shape.w,
          height: shape.h,
          bottomRow: landingRow,
        };

        setPieces((prev) => [...prev, newPiece]);
        piecesDropped++;
      }, 250);
    }

    return () => {
      if (activeIntervalRef.current) clearInterval(activeIntervalRef.current);
      if (activeTimeoutRef.current) clearTimeout(activeTimeoutRef.current);
    };
  }, [cycle]);

  // GSAP animation logic for incoming blocks
  useGSAP(() => {
    const newElements = containerRef.current?.querySelectorAll(".tetris-piece:not(.animated)");
    if (!newElements || newElements.length === 0) return;

    newElements.forEach((el) => {
      el.classList.add("animated");
      
      // Dynamic fall distance so blocks drop in from above the container boundary
      const containerHeight = containerRef.current?.clientHeight || 450;

      gsap.fromTo(
        el,
        { y: -containerHeight, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          ease: "power1.in", // gravity fall feel
        }
      );
    });
  }, { dependencies: [pieces], scope: containerRef });

  // Clean reset: animate pieces falling out of the bottom and clear the grid
  const triggerReset = (onCompleteCallback: () => void) => {
    if (isResettingRef.current) return;
    isResettingRef.current = true;

    const pieceElements = containerRef.current?.querySelectorAll(".tetris-piece");
    if (!pieceElements || pieceElements.length === 0) {
      setPieces([]);
      colHeightsRef.current = Array(COLUMNS).fill(0);
      isResettingRef.current = false;
      onCompleteCallback();
      return;
    }

    const containerHeight = containerRef.current?.clientHeight || 450;

    const tl = gsap.timeline({
      onComplete: () => {
        setPieces([]);
        colHeightsRef.current = Array(COLUMNS).fill(0);
        isResettingRef.current = false;
        onCompleteCallback();
      },
    });

    // Staggered gravity fall exit out of the container
    tl.to(pieceElements, {
      y: containerHeight,
      opacity: 0,
      duration: 0.6,
      ease: "power2.in",
      stagger: {
        amount: 0.35,
        from: "random",
      },
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[350px] bg-white overflow-hidden border border-gray-200 rounded-none select-none"
    >
      {/* Technical Grid Overlay (Faint Background) */}
      <div className="absolute inset-0 tech-grid opacity-30 pointer-events-none z-0" />

      {/* Grid Container for falling pieces */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {pieces.map((item) => {
          const isFin = cycle === "fin";
          // Shift horizontally by +1 column to perfectly center the 23-col wide scaled shape in the 24-col grid
          const xOffset = isFin ? 1 : 0;
          // Align directly to the absolute bottom (yOffset = 0)
          const yOffset = 0;

          return (
            <div
              key={item.id}
              className="tetris-piece absolute bg-[#00319A] border border-white/20 rounded-none"
              style={{
                left: `${(item.left + xOffset) * BLOCK_SIZE}px`,
                width: `${item.width * BLOCK_SIZE}px`,
                height: `${item.height * BLOCK_SIZE}px`,
                bottom: `${(item.bottomRow + yOffset) * BLOCK_SIZE}px`,
                opacity: 0, // prevents flash before GSAP animation triggers
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
