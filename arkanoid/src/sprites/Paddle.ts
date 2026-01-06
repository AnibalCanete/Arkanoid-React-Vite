
import type { Vector } from "../types/types";

export class Paddle {
    private paddleImage: HTMLImageElement = new Image();
    private moveLeft: boolean;
    private moveRight: boolean;

    public speed: number;
    public paddleWidth: number;
    public paddleHeight: number;
    public position: Vector;

    constructor(speed: number, paddleWidth: number, paddleHeight: number, position: Vector, image: string) {
        this.speed = speed;
        this.paddleWidth = paddleWidth;
        this.paddleHeight = paddleHeight;
        this.position = position;
        this.moveLeft = false;
        this.moveRight = false;
        this.paddleImage.src = image;

        // Event Listeners
        document.addEventListener("keydown", this.handleKeyDown);
        document.addEventListener("keyup", this.handleKeyUp);
    };

    // Getters
    get width(): number {
        return this.paddleWidth;
    };

    get height(): number {
        return this.paddleHeight;
    };

    get pos(): Vector {
        return this.position;
    };

    get image(): HTMLImageElement {
        return this.paddleImage;
    };

    get isMovingLeft(): boolean {
        return this.moveLeft;
    };

    get isMovingRight(): boolean {
        return this.moveRight;
    };

    movePaddle(): void {
        if (this.moveLeft) this.pos.x -= this.speed;
        if (this.moveRight) this.pos.x += this.speed;
    };

    handleKeyUp = (e: KeyboardEvent): void => {
        if (e.code === "ArrowLeft" || e.key === "ArrowLeft") this.moveLeft = false;
        if (e.code === "ArrowRight" || e.key === "ArrowRight") this.moveRight = false;
    };

    handleKeyDown = (e: KeyboardEvent): void => {
        if (e.code === "ArrowLeft" || e.key === "ArrowLeft") this.moveLeft = true;
        if (e.code === "ArrowRight" || e.key === "ArrowRight") this.moveRight = true;
    };

    // Touch handler: follow finger
    handleTouchMove = (e: TouchEvent): void => {
        const touch = e.touches[0];
        if (!touch) return;
        // Adjust paddle position to finger
        this.position.x = touch.clientX - this.paddleWidth / 2;
        // Prevent it from going off the canvas
        if (this.position.x < 0) this.position.x = 0;
        if (this.position.x + this.paddleWidth > window.innerWidth) {
            this.position.x = window.innerWidth - this.paddleWidth;
        }
    };
};
