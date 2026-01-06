
import { CanvasView } from "./view/CanvasView";
import { Ball } from "./sprites/Ball";
import { Brick } from "./sprites/Brick";
import { Paddle } from "./sprites/Paddle";
import { Collision } from "./core/Collison";
import "./App.css";
// Images
import PADDLE_IMAGE from "./assets/images/paddle.png";
import BALL_IMAGE from "./assets/images/ball.png";
// Level and Colors
import { PADDLE_SPEED, PADDLE_WIDTH, PADDLE_HEIGHT, PADDLE_STARTX, BALL_SPEED, BALL_SIZE, BALL_STARTX, BALL_STARTY } from "./core/setup";
// Helpers
import { createBricks } from "./core/helpers";
import { useEffect, useRef } from "react"; 

function App() {
  let gameOver = false;
  let score = 0;
  
  function setGameOver(view: CanvasView) {
    view.drawInfo("¡Game Over!");
    gameOver = false;
  };

  function setGameWin(view: CanvasView) {
    view.drawInfo("¡Game Won!");
    gameOver = false;
  };

  function gameLoop(view: CanvasView, bricks: Brick[], paddle: Paddle, ball: Ball, collision: Collision) {
    console.log("Draw!");
    view.clear();
    view.drawBricks(bricks);
    view.drawSprite(paddle);
    view.drawSprite(ball);
    // Move Ball
    ball.moveBall();

    // Move Paddle and Check So It Won't Exit The Playfield
    if ((paddle.isMovingLeft && paddle.pos.x > 0) || (paddle.isMovingRight && paddle.pos.x < view.canvas.width - paddle.width)) {
      paddle.movePaddle();
    }

    collision.checkBallCollision(ball, paddle, view);
    const collidingBrick = collision.isCollidingBricks(ball, bricks);

    if (collidingBrick) {
      score += 1;
      view.drawScore(score);
    }

    // Game Over When Ball Leaves Playfield
    if (ball.pos.y > view.canvas.height) gameOver = true;
    // If Game Won, Set gameOver and Display Win
    if (bricks.length === 0) return setGameWin(view);
    // Return if gameOver and Don't run The requesAnimationFrame
    if (gameOver) return setGameOver(view);

    requestAnimationFrame(() => gameLoop(view, bricks, paddle, ball, collision));
  };
  
  function startGame(view: CanvasView) {
    // Reset Displays
    score = 0;
    view.drawInfo("");
    view.drawScore(0);
    // Create a collision Instance
    const collision = new Collision();
    // Create al Bricks
    const bricks = createBricks();
    // Create a Ball
    const ball = new Ball(BALL_SPEED, BALL_SIZE, { x: BALL_STARTX, y: BALL_STARTY }, BALL_IMAGE);
    // Create a Paddle
    const paddle = new Paddle(PADDLE_SPEED, PADDLE_WIDTH, PADDLE_HEIGHT, { x: PADDLE_STARTX, y: view.canvas.height - PADDLE_HEIGHT -5 }, PADDLE_IMAGE);

    gameLoop(view, bricks, paddle, ball, collision);
  };

  // Create a New View
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvasRef.current) {
      const view = new CanvasView(canvasRef.current);
      view.initStartButton(startGame)
    }
  }, []);

  return (
    <>
      <div className="main" id="main">
        <canvas id="playField" width={1000} height={600} ref={canvasRef}></canvas>
        <div id="display">
          <div id="score"></div>
          <button id="start">Start</button>
          <div id="info">Press Start!</div>
        </div>
      </div>
    </>
  );
};

export default App;
