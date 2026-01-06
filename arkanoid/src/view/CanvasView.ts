
// Types
import { Brick } from "../sprites/Brick";
import { Paddle } from "../sprites/Paddle";
import { Ball } from "../sprites/Ball";

export class CanvasView {
    canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D | null;
    private scoreDisplay: HTMLObjectElement | null;
    private start: HTMLButtonElement | null;
    private info: HTMLObjectElement | null;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        const ctx = canvas.getContext("2d");
        this.context = ctx;
        this.scoreDisplay = document.querySelector("#score");
        this.start = document.querySelector("#start") as HTMLButtonElement;
        this.info = document.querySelector("#info");
    }

    clear(): void {
        this.context?.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };

    initStartButton(startFunction: (view: CanvasView) => void): void {
        this.start?.addEventListener("click", () => startFunction(this));
    };

    drawScore(score: number): void {
        if (this.scoreDisplay) this.scoreDisplay.innerHTML = score.toString();
    };

    drawInfo(text: string): void {
        if (this.info) this.info.innerHTML = text;
    };

    drawSprite(brick: Brick | Paddle | Ball): void {
        if (!brick) return;
        this.context?.drawImage(brick.image, brick.pos.x, brick.pos.y, brick.width, brick.height);
    };

    drawBricks(bricks: Brick[]): void {
        bricks.forEach(brick => this.drawSprite(brick));
    };

    initTouchControls(paddle: Paddle): void {
        this.canvas.addEventListener("touchmove", (e) => {
            const touch = e.touches[0];
            if (!touch) return;
            // Calculate position relative to the canvas
            const rect = this.canvas.getBoundingClientRect();
            const offsetX = touch.clientX - rect.left;
            paddle.pos.x = offsetX - paddle.width / 2;
            // Limit within the canvas
            if (paddle.pos.x < 0) paddle.pos.x = 0;
            if (paddle.pos.x + paddle.width > this.canvas.width) {
                paddle.pos.x = this.canvas.width - paddle.width;
            }
        }, { passive: false });

        this.canvas.addEventListener("touchstart", (e) => {
            const touch = e.touches[0];
            if (!touch) return;
            paddle.pos.x = touch.clientX - paddle.width / 2;
        }, { passive: false });
    };
};
