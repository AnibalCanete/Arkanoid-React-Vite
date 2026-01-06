
import type { Vector } from "../types/types";

export class Brick {
    private brickImage: HTMLImageElement = new Image();
    
    public brickWidth: number;
    public brickHeight: number;
    public position: Vector;
    public brickEnergy: number;

    constructor(brickWidth: number, brickHeight: number, position: Vector, brickEnergy: number, image: string ) {
        this.brickWidth = brickWidth;
        this.brickHeight = brickHeight;
        this.position = position;
        this.brickEnergy = brickEnergy;
        this.brickImage.src = image;
    };

    // Getters
    get width(): number {
        return this.brickWidth;
    };

    get height(): number {
        return this.brickHeight;
    };

    get pos(): Vector {
        return this.position;
    };

    get image(): HTMLImageElement {
        return this.brickImage;
    };

    get energy(): number {
        return this.brickEnergy;
    };

    // Setter
    set energy(energy: number) {
        this.brickEnergy = energy;
    };
};
