/**
 * SUBWAY RUNNER 3D - TECH STACK & 90 PROGRAMMING LANGUAGES EDITION
 * Features 90 collectible 3D language coins, Web Audio music engine, and high-speed gameplay.
 */

(function () {
  'use strict';

  // ==========================================
  // CONFIGURATION & CONSTANTS
  // ==========================================
  const LANES = [-3.2, 0, 3.2]; // Left, Center, Right
  const LANE_CHANGE_SPEED = 18;
  const BASE_SPEED = 25;
  const MAX_SPEED = 52;
  const SPEED_ACCELERATION = 0.35;
  const GRAVITY = 48;
  const JUMP_FORCE = 16.5;
  const SUPER_JUMP_FORCE = 25.0;
  const SLIDE_DURATION = 0.75;
  const CHUNK_LENGTH = 120;
  const VISIBLE_CHUNKS = 5;
  const TRAIN_HEIGHT = 3.6;

  // ==========================================
  // 3D PROCEDURAL CHARACTER BUILDER
  // ==========================================
  function createCharacter() {
    const characterGroup = new THREE.Group();

    // Materials
    const skinMat = new THREE.MeshLambertMaterial({ color: 0xffcc99 });
    const hoodieMat = new THREE.MeshLambertMaterial({ color: 0x00d2ff }); // Vibrant cyan hoodie
    const pantsMat = new THREE.MeshLambertMaterial({ color: 0x1f242d }); // Dark cargo joggers
    const capMat = new THREE.MeshLambertMaterial({ color: 0xff0055 }); // Red backward cap
    const sneakerMat = new THREE.MeshLambertMaterial({ color: 0xffffff }); // White high-tops
    const backpackMat = new THREE.MeshLambertMaterial({ color: 0xffaa00 }); // Orange graffiti backpack

    // 1. Torso (Hoodie)
    const torsoGeo = new THREE.BoxGeometry(0.85, 1.1, 0.55);
    const torso = new THREE.Mesh(torsoGeo, hoodieMat);
    torso.position.y = 1.35;
    characterGroup.add(torso);

    // Graphic stripe on torso
    const graphicGeo = new THREE.PlaneGeometry(0.5, 0.5);
    const graphicMat = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    const graphic = new THREE.Mesh(graphicGeo, graphicMat);
    graphic.position.set(0, 1.35, 0.285);
    characterGroup.add(graphic);

    // 2. Backpack
    const backpackGeo = new THREE.BoxGeometry(0.7, 0.8, 0.35);
    const backpack = new THREE.Mesh(backpackGeo, backpackMat);
    backpack.position.set(0, 1.4, -0.4);
    characterGroup.add(backpack);

    // 3. Head
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 2.15, 0);

    const headGeo = new THREE.SphereGeometry(0.38, 16, 16);
    const head = new THREE.Mesh(headGeo, skinMat);
    headGroup.add(head);

    // Cap (dome + backward visor)
    const capGeo = new THREE.SphereGeometry(0.4, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.55);
    const cap = new THREE.Mesh(capGeo, capMat);
    cap.position.y = 0.05;
    headGroup.add(cap);

    // Backward Visor
    const visorGeo = new THREE.BoxGeometry(0.38, 0.05, 0.35);
    const visor = new THREE.Mesh(visorGeo, capMat);
    visor.position.set(0, 0.15, -0.4);
    visor.rotation.x = 0.2;
    headGroup.add(visor);

    characterGroup.add(headGroup);

    // 4. Arms
    const armGeo = new THREE.BoxGeometry(0.24, 0.85, 0.24);

    const leftArm = new THREE.Mesh(armGeo, hoodieMat);
    leftArm.position.set(-0.58, 1.35, 0);
    characterGroup.add(leftArm);

    const rightArm = new THREE.Mesh(armGeo, hoodieMat);
    rightArm.position.set(0.58, 1.35, 0);
    characterGroup.add(rightArm);

    // 5. Legs
    const legGeo = new THREE.BoxGeometry(0.3, 0.9, 0.3);

    const leftLegGroup = new THREE.Group();
    leftLegGroup.position.set(-0.25, 0.9, 0);
    const leftLeg = new THREE.Mesh(legGeo, pantsMat);
    leftLeg.position.y = -0.45;
    leftLegGroup.add(leftLeg);

    const leftShoe = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.22, 0.5), sneakerMat);
    leftShoe.position.set(0, -0.85, 0.1);
    leftLegGroup.add(leftShoe);
    characterGroup.add(leftLegGroup);

    const rightLegGroup = new THREE.Group();
    rightLegGroup.position.set(0.25, 0.9, 0);
    const rightLeg = new THREE.Mesh(legGeo, pantsMat);
    rightLeg.position.y = -0.45;
    rightLegGroup.add(rightLeg);

    const rightShoe = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.22, 0.5), sneakerMat);
    rightShoe.position.set(0, -0.85, 0.1);
    rightLegGroup.add(rightShoe);
    characterGroup.add(rightLegGroup);

    // 6. Hoverboard (Futuristic glowing hoverboard)
    const boardGroup = new THREE.Group();
    const boardDeck = new THREE.Mesh(
      new THREE.BoxGeometry(1.0, 0.12, 2.4),
      new THREE.MeshLambertMaterial({ color: 0x9d00ff })
    );
    const boardGlow = new THREE.Mesh(
      new THREE.BoxGeometry(0.8, 0.05, 2.2),
      new THREE.MeshBasicMaterial({ color: 0x00f0ff })
    );
    boardGlow.position.y = -0.05;
    boardGroup.add(boardDeck);
    boardGroup.add(boardGlow);
    boardGroup.position.set(0, 0.08, 0);
    boardGroup.visible = false;
    characterGroup.add(boardGroup);

    return {
      root: characterGroup,
      headGroup,
      leftArm,
      rightArm,
      leftLegGroup,
      rightLegGroup,
      boardGroup,
      hoodieMat,
      torso
    };
  }

  // ==========================================
  // ENVIRONMENT & 3D TECH COIN BUILDER
  // ==========================================
  class WorldBuilder {
    constructor(scene) {
      this.scene = scene;

      // Shared Geometries & Materials
      this.railMat = new THREE.MeshStandardMaterial({
        color: 0xdddddd,
        metalness: 0.92,
        roughness: 0.18
      });
      this.sleeperMat = new THREE.MeshLambertMaterial({ color: 0x4a2e18 });
      this.groundMat = new THREE.MeshLambertMaterial({ color: 0x141620 });
      this.wallMat = new THREE.MeshLambertMaterial({ color: 0x242838 });
      this.barrierMat = new THREE.MeshLambertMaterial({ color: 0xff2233 });
      this.stripeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      this.trainBodyMat1 = new THREE.MeshLambertMaterial({ color: 0xb01a35 });
      this.trainBodyMat2 = new THREE.MeshLambertMaterial({ color: 0x1f5c99 });
      this.trainTopMat = new THREE.MeshLambertMaterial({ color: 0xd6d6d6 });
      this.windowMat = new THREE.MeshBasicMaterial({ color: 0xffea78 });
      this.lightMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

      // Coin 3D Geometry
      this.coinGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.12, 32);
      this.coinBevelGeo = new THREE.TorusGeometry(0.55, 0.04, 8, 32);

      // Edge Rim Material (Polished gold reeding)
      this.coinRimMat = new THREE.MeshStandardMaterial({
        color: 0xffd700,
        metalness: 0.95,
        roughness: 0.15
      });

      // Cache for generated language CanvasTextures
      this.textureCache = new Map();

      // Skyline Skyscraper Geometry
      this.buildingMat = new THREE.MeshLambertMaterial({ color: 0x121526 });
      this.buildingWindowMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
    }

    getLanguageTexture(lang) {
      if (this.textureCache.has(lang.id)) {
        return this.textureCache.get(lang.id);
      }
      const canvas = createCoinCanvas(lang);
      const texture = new THREE.CanvasTexture(canvas);
      texture.minFilter = THREE.LinearFilter;
      this.textureCache.set(lang.id, texture);
      return texture;
    }

    createTechCoin(customLang = null) {
      // Pick random language if not supplied
      const lang = customLang || PROGRAMMING_LANGUAGES[Math.floor(Math.random() * PROGRAMMING_LANGUAGES.length)];
      const texture = this.getLanguageTexture(lang);

      const coinGroup = new THREE.Group();
      coinGroup.userData = {
        type: 'coin',
        lang: lang,
        value: 1,
        radius: 0.65
      };

      // Multi-material for cylinder: [side, top, bottom]
      const faceMat = new THREE.MeshStandardMaterial({
        map: texture,
        metalness: 0.75,
        roughness: 0.25
      });

      const materials = [this.coinRimMat, faceMat, faceMat];
      const coinMesh = new THREE.Mesh(this.coinGeo, materials);
      coinMesh.rotation.x = Math.PI / 2; // Face forward
      coinGroup.add(coinMesh);

      // Metallic beveled rim for realistic 3D rounded edge
      const bevel = new THREE.Mesh(this.coinBevelGeo, this.coinRimMat);
      coinGroup.add(bevel);

      // Subtle glowing halo for legendary coins
      if (lang.tier === 'legendary') {
        const glowGeo = new THREE.SphereGeometry(0.72, 12, 12);
        const glowMat = new THREE.MeshBasicMaterial({
          color: 0xffd700,
          transparent: true,
          opacity: 0.2,
          wireframe: true
        });
        const glow = new THREE.Mesh(glowGeo, glowMat);
        coinGroup.add(glow);
      }

      return coinGroup;
    }

    createTrackChunk(startZ) {
      const chunk = new THREE.Group();
      chunk.position.z = startZ;

      // 1. Gravel Bed / Track Ground
      const groundGeo = new THREE.PlaneGeometry(16, CHUNK_LENGTH);
      const ground = new THREE.Mesh(groundGeo, this.groundMat);
      ground.rotation.x = -Math.PI / 2;
      ground.position.set(0, 0, -CHUNK_LENGTH / 2);
      chunk.add(ground);

      // 2. Concrete Side Retaining Walls with Graffiti Accents
      const wallGeo = new THREE.BoxGeometry(1.2, 5.0, CHUNK_LENGTH);
      const leftWall = new THREE.Mesh(wallGeo, this.wallMat);
      leftWall.position.set(-8.5, 2.5, -CHUNK_LENGTH / 2);
      chunk.add(leftWall);

      const rightWall = new THREE.Mesh(wallGeo, this.wallMat);
      rightWall.position.set(8.5, 2.5, -CHUNK_LENGTH / 2);
      chunk.add(rightWall);

      // Neon graffiti posters on walls
      for (let w = 15; w < CHUNK_LENGTH; w += 35) {
        const posterColor = [0xff0055, 0x00f0ff, 0xffb800, 0x9d00ff][Math.floor(Math.random() * 4)];
        const posterMat = new THREE.MeshBasicMaterial({ color: posterColor });
        const posterGeo = new THREE.PlaneGeometry(3.5, 2.2);

        const pLeft = new THREE.Mesh(posterGeo, posterMat);
        pLeft.position.set(-7.88, 2.6, -w);
        pLeft.rotation.y = Math.PI / 2;
        chunk.add(pLeft);

        const pRight = new THREE.Mesh(posterGeo, posterMat);
        pRight.position.set(7.88, 2.6, -w);
        pRight.rotation.y = -Math.PI / 2;
        chunk.add(pRight);
      }

      // 3. Rails and Wooden Sleepers for all 3 Lanes
      const railGeo = new THREE.BoxGeometry(0.12, 0.16, CHUNK_LENGTH);
      const sleeperGeo = new THREE.BoxGeometry(2.4, 0.14, 0.45);

      LANES.forEach((laneX) => {
        const r1 = new THREE.Mesh(railGeo, this.railMat);
        r1.position.set(laneX - 0.9, 0.1, -CHUNK_LENGTH / 2);
        chunk.add(r1);

        const r2 = new THREE.Mesh(railGeo, this.railMat);
        r2.position.set(laneX + 0.9, 0.1, -CHUNK_LENGTH / 2);
        chunk.add(r2);

        for (let s = 1; s < CHUNK_LENGTH; s += 2.4) {
          const sleeper = new THREE.Mesh(sleeperGeo, this.sleeperMat);
          sleeper.position.set(laneX, 0.05, -s);
          chunk.add(sleeper);
        }
      });

      // 4. Overhead Catenary Gantries (Railway Power Arches)
      const archPillarGeo = new THREE.CylinderGeometry(0.15, 0.15, 6.5);
      const archBeamGeo = new THREE.BoxGeometry(16, 0.25, 0.25);
      const archMat = new THREE.MeshLambertMaterial({ color: 0x444455 });

      for (let a = 25; a < CHUNK_LENGTH; a += 50) {
        const arch = new THREE.Group();
        arch.position.set(0, 0, -a);

        const pL = new THREE.Mesh(archPillarGeo, archMat);
        pL.position.set(-7.5, 3.25, 0);
        arch.add(pL);

        const pR = new THREE.Mesh(archPillarGeo, archMat);
        pR.position.set(7.5, 3.25, 0);
        arch.add(pR);

        const beam = new THREE.Mesh(archBeamGeo, archMat);
        beam.position.set(0, 6.2, 0);
        arch.add(beam);

        // Traffic warning signal lights on gantry
        const signalGeo = new THREE.SphereGeometry(0.2, 8, 8);
        const signalMat = new THREE.MeshBasicMaterial({ color: 0x00ff44 });
        const sig = new THREE.Mesh(signalGeo, signalMat);
        sig.position.set(0, 5.8, 0);
        arch.add(sig);

        chunk.add(arch);
      }

      // 5. Distant City Skyline Buildings on both sides
      for (let b = 10; b < CHUNK_LENGTH; b += 40) {
        const bHeight = 15 + Math.random() * 20;
        const bGeo = new THREE.BoxGeometry(10, bHeight, 20);
        const bL = new THREE.Mesh(bGeo, this.buildingMat);
        bL.position.set(-20, bHeight / 2, -b);
        chunk.add(bL);

        const bR = new THREE.Mesh(bGeo, this.buildingMat);
        bR.position.set(20, bHeight / 2, -b);
        chunk.add(bR);
      }

      return chunk;
    }

    createSubwayTrain(length = 26, isMoving = false, hasRamp = false) {
      const trainGroup = new THREE.Group();
      trainGroup.userData = {
        type: 'train',
        length,
        isMoving,
        speed: isMoving ? 12 : 0,
        hasRamp,
        bounds: {
          width: 2.3,
          height: TRAIN_HEIGHT,
          length: length
        }
      };

      const bodyMat = Math.random() > 0.5 ? this.trainBodyMat1 : this.trainBodyMat2;

      // Train Body
      const bodyGeo = new THREE.BoxGeometry(2.3, TRAIN_HEIGHT, length);
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      body.position.set(0, TRAIN_HEIGHT / 2, -length / 2);
      trainGroup.add(body);

      // Train Roof Walkway
      const roofGeo = new THREE.BoxGeometry(2.1, 0.15, length - 0.2);
      const roof = new THREE.Mesh(roofGeo, this.trainTopMat);
      roof.position.set(0, TRAIN_HEIGHT + 0.08, -length / 2);
      trainGroup.add(roof);

      // Train Windows (Sides)
      const winGeo = new THREE.PlaneGeometry(1.2, 0.85);
      for (let z = 2.5; z < length - 2.5; z += 3.2) {
        const wL = new THREE.Mesh(winGeo, this.windowMat);
        wL.position.set(-1.16, 2.3, -z);
        wL.rotation.y = -Math.PI / 2;
        trainGroup.add(wL);

        const wR = new THREE.Mesh(winGeo, this.windowMat);
        wR.position.set(1.16, 2.3, -z);
        wR.rotation.y = Math.PI / 2;
        trainGroup.add(wR);
      }

      // Train Front Face & Headlights
      const frontFaceMat = new THREE.MeshLambertMaterial({ color: 0x222222 });
      const frontFace = new THREE.Mesh(new THREE.BoxGeometry(2.28, TRAIN_HEIGHT - 0.2, 0.2), frontFaceMat);
      frontFace.position.set(0, TRAIN_HEIGHT / 2, 0.08);
      trainGroup.add(frontFace);

      // Dual Headlights
      const lightGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.1, 12);
      lightGeo.rotateX(Math.PI / 2);
      const lightL = new THREE.Mesh(lightGeo, this.lightMat);
      lightL.position.set(-0.7, 1.2, 0.2);
      trainGroup.add(lightL);

      const lightR = new THREE.Mesh(lightGeo, this.lightMat);
      lightR.position.set(0.7, 1.2, 0.2);
      trainGroup.add(lightR);

      // Optional Wooden/Metal Ramp in front of train so player can run up
      if (hasRamp) {
        const rampGeo = new THREE.BoxGeometry(2.2, 0.2, 5.0);
        const ramp = new THREE.Mesh(rampGeo, this.sleeperMat);
        ramp.position.set(0, TRAIN_HEIGHT / 2, 2.5);
        ramp.rotation.x = Math.atan2(TRAIN_HEIGHT, 5.0);
        trainGroup.add(ramp);
        trainGroup.userData.rampLength = 5.0;
      }

      return trainGroup;
    }

    createLowBarrier() {
      const group = new THREE.Group();
      group.userData = {
        type: 'low_barrier',
        bounds: { width: 2.2, height: 1.1, depth: 0.6 }
      };

      const wood = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.45, 0.25), this.barrierMat);
      wood.position.y = 0.85;
      group.add(wood);

      const stripe1 = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.46, 0.26), this.stripeMat);
      stripe1.position.set(-0.6, 0.85, 0);
      group.add(stripe1);

      const stripe2 = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.46, 0.26), this.stripeMat);
      stripe2.position.set(0.6, 0.85, 0);
      group.add(stripe2);

      const legGeo = new THREE.BoxGeometry(0.18, 1.1, 0.18);
      const legMat = new THREE.MeshLambertMaterial({ color: 0x333333 });

      const l1 = new THREE.Mesh(legGeo, legMat);
      l1.position.set(-0.95, 0.55, 0);
      group.add(l1);

      const l2 = new THREE.Mesh(legGeo, legMat);
      l2.position.set(0.95, 0.55, 0);
      group.add(l2);

      return group;
    }

    createHighBarrier() {
      const group = new THREE.Group();
      group.userData = {
        type: 'high_barrier',
        bounds: { width: 2.4, bottomY: 1.1, height: 2.2, depth: 0.6 }
      };

      const postMat = new THREE.MeshLambertMaterial({ color: 0x222222 });
      const signMat = new THREE.MeshLambertMaterial({ color: 0xffaa00 });

      const bar = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.65, 0.2), signMat);
      bar.position.y = 2.0;
      group.add(bar);

      const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.66, 0.22), this.barrierMat);
      stripe.position.set(0, 2.0, 0);
      group.add(stripe);

      const postGeo = new THREE.BoxGeometry(0.16, 2.4, 0.16);
      const p1 = new THREE.Mesh(postGeo, postMat);
      p1.position.set(-1.1, 1.2, 0);
      group.add(p1);

      const p2 = new THREE.Mesh(postGeo, postMat);
      p2.position.set(1.1, 1.2, 0);
      group.add(p2);

      return group;
    }

    createPowerup(type) {
      const group = new THREE.Group();
      group.userData = {
        type: 'powerup',
        powerupType: type,
        radius: 0.8
      };

      const magnetMat = new THREE.MeshLambertMaterial({ color: 0xff0044 });
      const sneakerMat = new THREE.MeshLambertMaterial({ color: 0x00ffcc });
      const starMat = new THREE.MeshLambertMaterial({ color: 0xffbb00 });

      if (type === 'magnet') {
        const uGeo = new THREE.TorusGeometry(0.4, 0.14, 8, 16, Math.PI);
        const magnetMesh = new THREE.Mesh(uGeo, magnetMat);
        magnetMesh.rotation.z = Math.PI;
        group.add(magnetMesh);
      } else if (type === 'sneakers') {
        const sGeo = new THREE.BoxGeometry(0.6, 0.35, 0.7);
        const mesh = new THREE.Mesh(sGeo, sneakerMat);
        group.add(mesh);
      } else if (type === 'multiplier') {
        const starGeo = new THREE.OctahedronGeometry(0.45);
        const star = new THREE.Mesh(starGeo, starMat);
        group.add(star);
      } else if (type === 'hoverboard') {
        const boardGeo = new THREE.BoxGeometry(0.35, 0.08, 0.9);
        const boardMat = new THREE.MeshLambertMaterial({ color: 0x9d00ff });
        const mesh = new THREE.Mesh(boardGeo, boardMat);
        group.add(mesh);
      }

      const haloGeo = new THREE.SphereGeometry(0.6, 12, 12);
      const haloMat = new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
        transparent: true,
        opacity: 0.25,
        wireframe: true
      });
      const halo = new THREE.Mesh(haloGeo, haloMat);
      group.add(halo);

      return group;
    }
  }

  // ==========================================
  // PARTICLE SYSTEM
  // ==========================================
  class ParticleManager {
    constructor(scene) {
      this.scene = scene;
      this.particles = [];
      this.dustGeo = new THREE.BoxGeometry(0.12, 0.12, 0.12);
      this.sparkleGeo = new THREE.PlaneGeometry(0.18, 0.18);
    }

    spawnRunDust(x, y, z) {
      const mat = new THREE.MeshBasicMaterial({ color: 0xcccccc, transparent: true, opacity: 0.6 });
      const p = new THREE.Mesh(this.dustGeo, mat);
      p.position.set(x + (Math.random() - 0.5) * 0.4, y + 0.1, z + 0.3);
      this.scene.add(p);
      this.particles.push({
        mesh: p,
        vel: new THREE.Vector3((Math.random() - 0.5) * 1.5, Math.random() * 2 + 1, Math.random() * 2 + 2),
        life: 0.35,
        maxLife: 0.35
      });
    }

    spawnCoinBurst(x, y, z, hexColor = 0xffd700) {
      for (let i = 0; i < 8; i++) {
        const mat = new THREE.MeshBasicMaterial({ color: hexColor, transparent: true, opacity: 0.9, side: THREE.DoubleSide });
        const p = new THREE.Mesh(this.sparkleGeo, mat);
        p.position.set(x, y, z);
        this.scene.add(p);
        const angle = (Math.PI * 2 * i) / 8;
        this.particles.push({
          mesh: p,
          vel: new THREE.Vector3(Math.cos(angle) * (Math.random() * 4 + 2), Math.sin(angle) * (Math.random() * 4 + 2), (Math.random() - 0.5) * 3),
          life: 0.45,
          maxLife: 0.45
        });
      }
    }

    update(delta) {
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.life -= delta;
        p.mesh.position.addScaledVector(p.vel, delta);
        p.mesh.material.opacity = (p.life / p.maxLife) * 0.9;
        p.mesh.rotation.x += 5 * delta;
        p.mesh.rotation.y += 5 * delta;

        if (p.life <= 0) {
          this.scene.remove(p.mesh);
          p.mesh.geometry.dispose();
          p.mesh.material.dispose();
          this.particles.splice(i, 1);
        }
      }
    }
  }

  // ==========================================
  // CORE GAME CLASS
  // ==========================================
  class SubwayGame {
    constructor() {
      this.state = 'MENU';
      this.score = 0;
      this.coins = 0;
      this.highScore = parseInt(localStorage.getItem('subway_runner_highscore') || '0', 10);
      this.multiplier = 1;
      this.speed = BASE_SPEED;
      this.distanceTraveled = 0;

      // Tech Stack Set (tracking unique languages collected)
      const storedStack = localStorage.getItem('subway_tech_stack');
      this.collectedTech = new Set(storedStack ? JSON.parse(storedStack) : []);

      // Player Position & Motion State
      this.currentLane = 1;
      this.targetX = LANES[1];
      this.playerX = LANES[1];
      this.playerY = 0;
      this.playerZ = 0;
      this.velocityY = 0;
      this.isGrounded = true;
      this.isSliding = false;
      this.slideTimer = 0;
      this.currentPlatformY = 0;

      // Power-up States
      this.activePowerups = {
        magnet: 0,
        sneakers: 0,
        multiplier: 0,
        hoverboard: 0
      };
      this.hasHoverboardAvailable = true;

      // Subsystems
      this.music = new SubwayMusicPlayer();
      this.initThree();
      this.worldBuilder = new WorldBuilder(this.scene);
      this.particleManager = new ParticleManager(this.scene);
      this.character = createCharacter();
      this.scene.add(this.character.root);

      // World Chunk Tracking
      this.chunks = [];
      this.obstacles = [];
      this.collectibles = [];
      this.nextChunkZ = 0;

      this.cameraShake = 0;
      this.runAnimClock = 0;
      this.toastTimeout = null;

      this.initUI();
      this.initInput();
      this.resetWorld();

      // Start render loop
      this.lastTime = performance.now();
      requestAnimationFrame((t) => this.loop(t));
    }

    initThree() {
      this.container = document.getElementById('game-container');
      const w = window.innerWidth;
      const h = window.innerHeight;

      // Scene & Sunset Horizon Fog
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x0e111d);
      this.scene.fog = new THREE.FogExp2(0x0e111d, 0.012);

      // Camera: Classic Subway 3rd-person view
      this.camera = new THREE.PerspectiveCamera(65, w / h, 0.1, 400);
      this.camera.position.set(0, 4.2, 7.5);
      this.camera.lookAt(0, 2.0, -10);

      this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
      this.renderer.setSize(w, h);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.container.appendChild(this.renderer.domElement);

      // Lighting: Warm Sunset & Highlights for Coins
      const ambientLight = new THREE.AmbientLight(0xffeedd, 0.95);
      this.scene.add(ambientLight);

      const dirLight = new THREE.DirectionalLight(0xffd700, 1.2);
      dirLight.position.set(15, 25, 20);
      this.scene.add(dirLight);

      const sideLight = new THREE.DirectionalLight(0x00f0ff, 0.7);
      sideLight.position.set(-15, 15, -20);
      this.scene.add(sideLight);

      window.addEventListener('resize', () => this.onWindowResize());
    }

    initUI() {
      this.hudScore = document.getElementById('score-display');
      this.hudCoins = document.getElementById('coins-display');
      this.hudHighScore = document.getElementById('high-score-display');
      this.hudTechCount = document.getElementById('tech-count-display');
      this.hudMultiplier = document.getElementById('multiplier-display');
      this.hudPowerups = document.getElementById('active-powerups');
      this.langToast = document.getElementById('lang-toast');
      this.toastCoin = document.getElementById('toast-coin');
      this.toastText = document.getElementById('toast-text');

      this.startScreen = document.getElementById('start-screen');
      this.gameOverScreen = document.getElementById('game-over-screen');
      this.techModal = document.getElementById('tech-modal');
      this.techGridContainer = document.getElementById('tech-grid-container');
      this.modalCollectedCount = document.getElementById('modal-collected-count');

      this.finalScore = document.getElementById('final-score');
      this.finalCoins = document.getElementById('final-coins');
      this.finalTech = document.getElementById('final-tech');
      this.finalHighScore = document.getElementById('final-high-score');
      this.newRecordAlert = document.getElementById('new-record-alert');

      this.hudHighScore.textContent = this.highScore.toString();
      this.updateTechStackHUD();

      document.getElementById('start-btn').addEventListener('click', () => this.startGame());
      document.getElementById('restart-btn').addEventListener('click', () => this.startGame());

      // Tech Stack Gallery Modal handlers
      const openModal = () => this.renderTechModal();
      document.getElementById('tech-stack-btn').addEventListener('click', openModal);
      document.getElementById('tech-btn-hud').addEventListener('click', openModal);
      document.getElementById('view-stack-btn').addEventListener('click', openModal);
      document.getElementById('close-tech-modal').addEventListener('click', () => {
        this.techModal.classList.remove('active');
      });

      // Audio Mute Button
      const muteBtn = document.getElementById('mute-btn');
      const muteIcon = document.getElementById('mute-icon');
      muteBtn.addEventListener('click', () => {
        const isMuted = this.music.toggleMute();
        muteIcon.textContent = isMuted ? '🔇' : '🔊';
      });
    }

    renderTechModal() {
      this.techModal.classList.add('active');
      this.modalCollectedCount.textContent = this.collectedTech.size.toString();
      this.techGridContainer.innerHTML = '';

      PROGRAMMING_LANGUAGES.forEach((lang) => {
        const isOwned = this.collectedTech.has(lang.id);
        const card = document.createElement('div');
        card.className = `tech-card ${isOwned ? 'collected' : 'locked'}`;
        card.innerHTML = `
          <div class="tech-coin-preview" style="background:${lang.bg}; color:${lang.sec}">
            ${lang.symbol}
          </div>
          <div class="tech-name">${lang.name}</div>
          <div class="tech-tier tier-${lang.tier}">${lang.tier}</div>
        `;
        this.techGridContainer.appendChild(card);
      });
    }

    updateTechStackHUD() {
      const count = `${this.collectedTech.size}/${PROGRAMMING_LANGUAGES.length}`;
      if (this.hudTechCount) this.hudTechCount.textContent = count;
      const viewBtn = document.getElementById('view-stack-btn');
      if (viewBtn) viewBtn.querySelector('span').textContent = `VIEW TECH STACK (${count})`;
    }

    triggerTechToast(lang) {
      this.toastCoin.textContent = lang.symbol;
      this.toastCoin.style.background = lang.bg;
      this.toastCoin.style.color = lang.sec;
      this.toastText.textContent = `+1 ${lang.name} (${lang.text})`;
      this.langToast.classList.add('show');

      if (this.toastTimeout) clearTimeout(this.toastTimeout);
      this.toastTimeout = setTimeout(() => {
        this.langToast.classList.remove('show');
      }, 1400);
    }

    initInput() {
      window.addEventListener('keydown', (e) => {
        if (this.state === 'MENU' && (e.code === 'Space' || e.code === 'Enter')) {
          this.startGame();
          return;
        }
        if (this.state === 'GAMEOVER' && (e.code === 'Space' || e.code === 'Enter' || e.code === 'KeyR')) {
          this.startGame();
          return;
        }
        if (this.state !== 'PLAYING') return;

        switch (e.code) {
          case 'ArrowLeft':
          case 'KeyA':
            this.moveLane(-1);
            break;
          case 'ArrowRight':
          case 'KeyD':
            this.moveLane(1);
            break;
          case 'ArrowUp':
          case 'KeyW':
            this.jump();
            break;
          case 'ArrowDown':
          case 'KeyS':
            this.slide();
            break;
          case 'Space':
          case 'KeyE':
            this.activateHoverboard();
            break;
          case 'KeyM':
            document.getElementById('mute-btn').click();
            break;
        }
      });

      // Touch / Swipe Controls
      let touchStartX = 0;
      let touchStartY = 0;
      let touchStartTime = 0;

      window.addEventListener('touchstart', (e) => {
        if (e.touches.length > 0) {
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
          touchStartTime = performance.now();
        }
      }, { passive: true });

      window.addEventListener('touchend', (e) => {
        if (this.state !== 'PLAYING') return;
        if (e.changedTouches.length === 0) return;

        const deltaX = e.changedTouches[0].clientX - touchStartX;
        const deltaY = e.changedTouches[0].clientY - touchStartY;
        const deltaTime = performance.now() - touchStartTime;
        const absX = Math.abs(deltaX);
        const absY = Math.abs(deltaY);

        if (deltaTime < 400 && (absX > 30 || absY > 30)) {
          if (absX > absY) {
            if (deltaX > 0) this.moveLane(1);
            else this.moveLane(-1);
          } else {
            if (deltaY < 0) this.jump();
            else this.slide();
          }
        }
      }, { passive: true });
    }

    moveLane(dir) {
      const nextLane = this.currentLane + dir;
      if (nextLane >= 0 && nextLane < LANES.length) {
        this.currentLane = nextLane;
        this.targetX = LANES[this.currentLane];
      }
    }

    jump() {
      if (this.isGrounded) {
        const force = this.activePowerups.sneakers > 0 ? SUPER_JUMP_FORCE : JUMP_FORCE;
        this.velocityY = force;
        this.isGrounded = false;
        this.isSliding = false;
      }
    }

    slide() {
      if (!this.isGrounded) {
        this.velocityY = -GRAVITY * 0.7;
      }
      this.isSliding = true;
      this.slideTimer = SLIDE_DURATION;
    }

    activateHoverboard() {
      if (this.hasHoverboardAvailable && this.activePowerups.hoverboard <= 0) {
        this.activePowerups.hoverboard = 15.0;
        this.updatePowerupHUD();
      }
    }

    resetWorld() {
      this.chunks.forEach((c) => this.scene.remove(c));
      this.chunks = [];
      this.obstacles.forEach((o) => this.scene.remove(o));
      this.obstacles = [];
      this.collectibles.forEach((c) => this.scene.remove(c));
      this.collectibles = [];

      this.currentLane = 1;
      this.targetX = LANES[1];
      this.playerX = LANES[1];
      this.playerY = 0;
      this.playerZ = 0;
      this.velocityY = 0;
      this.isGrounded = true;
      this.isSliding = false;
      this.currentPlatformY = 0;
      this.speed = BASE_SPEED;
      this.score = 0;
      this.coins = 0;
      this.multiplier = 1;
      this.distanceTraveled = 0;
      this.nextChunkZ = 0;

      Object.keys(this.activePowerups).forEach((k) => (this.activePowerups[k] = 0));
      this.hasHoverboardAvailable = true;

      for (let i = 0; i < VISIBLE_CHUNKS; i++) {
        this.spawnChunk(i === 0);
      }

      this.updateHUD();
      this.updatePowerupHUD();
    }

    spawnChunk(isFirst = false) {
      const zPos = this.nextChunkZ;
      const chunk = this.worldBuilder.createTrackChunk(zPos);
      this.scene.add(chunk);
      this.chunks.push(chunk);

      if (!isFirst) {
        this.populateChunkContent(zPos);
      }

      this.nextChunkZ -= CHUNK_LENGTH;
    }

    populateChunkContent(chunkStartZ) {
      const zMin = chunkStartZ - 15;
      const zMax = chunkStartZ - CHUNK_LENGTH + 15;
      const encounterInterval = (zMin - zMax) / 3;

      for (let step = 0; step < 3; step++) {
        const encounterZ = zMin - step * encounterInterval - (Math.random() * 5);
        const freeLane = Math.floor(Math.random() * 3);

        LANES.forEach((laneX, laneIdx) => {
          if (laneIdx === freeLane) {
            // Spawn trail of 3D tech coins in free lane
            this.spawnCoinTrail(laneX, 0.8, encounterZ, 5);
            return;
          }

          const roll = Math.random();
          if (roll < 0.45) {
            // Subway Train
            const hasRamp = Math.random() < 0.45;
            const isMoving = Math.random() < 0.25 && this.distanceTraveled > 250;
            const train = this.worldBuilder.createSubwayTrain(26, isMoving, hasRamp);
            train.position.set(laneX, 0, encounterZ);
            this.scene.add(train);
            this.obstacles.push(train);

            // Put coins or powerup on top of train!
            this.spawnCoinTrail(laneX, TRAIN_HEIGHT + 0.9, encounterZ - 6, 4);

            if (Math.random() < 0.3) {
              const types = ['magnet', 'sneakers', 'multiplier', 'hoverboard'];
              const type = types[Math.floor(Math.random() * types.length)];
              const pUp = this.worldBuilder.createPowerup(type);
              pUp.position.set(laneX, TRAIN_HEIGHT + 1.2, encounterZ - 18);
              this.scene.add(pUp);
              this.collectibles.push(pUp);
            }
          } else if (roll < 0.72) {
            // Low Barrier (Must jump)
            const barrier = this.worldBuilder.createLowBarrier();
            barrier.position.set(laneX, 0, encounterZ);
            this.scene.add(barrier);
            this.obstacles.push(barrier);

            // Coin arc over barrier
            this.spawnCoinArc(laneX, encounterZ);
          } else {
            // High Barrier (Must slide)
            const barrier = this.worldBuilder.createHighBarrier();
            barrier.position.set(laneX, 0, encounterZ);
            this.scene.add(barrier);
            this.obstacles.push(barrier);

            // Low coins under barrier
            this.spawnCoinTrail(laneX, 0.45, encounterZ - 2, 3);
          }
        });
      }
    }

    spawnCoinTrail(x, y, startZ, count) {
      for (let i = 0; i < count; i++) {
        const coin = this.worldBuilder.createTechCoin();
        coin.position.set(x, y, startZ - i * 2.2);
        this.scene.add(coin);
        this.collectibles.push(coin);
      }
    }

    spawnCoinArc(x, centerZ) {
      const count = 5;
      for (let i = 0; i < count; i++) {
        const t = (i / (count - 1)) * Math.PI;
        const y = 0.8 + Math.sin(t) * 2.5;
        const z = centerZ + 2.5 - i * 1.2;
        const coin = this.worldBuilder.createTechCoin();
        coin.position.set(x, y, z);
        this.scene.add(coin);
        this.collectibles.push(coin);
      }
    }

    startGame() {
      this.music.start();
      this.state = 'PLAYING';
      this.resetWorld();
      this.startScreen.classList.remove('active');
      this.gameOverScreen.classList.remove('active');
      this.techModal.classList.remove('active');
    }

    triggerGameOver() {
      this.state = 'GAMEOVER';

      const finalScoreNum = Math.floor(this.score);
      this.finalScore.textContent = finalScoreNum.toString();
      this.finalCoins.textContent = this.coins.toString();
      this.finalTech.textContent = `${this.collectedTech.size}/${PROGRAMMING_LANGUAGES.length}`;

      let isNewRecord = false;
      if (finalScoreNum > this.highScore) {
        this.highScore = finalScoreNum;
        localStorage.setItem('subway_runner_highscore', this.highScore.toString());
        isNewRecord = true;
      }

      this.finalHighScore.textContent = this.highScore.toString();
      this.newRecordAlert.classList.toggle('hidden', !isNewRecord);

      this.gameOverScreen.classList.add('active');
    }

    updatePowerupHUD() {
      this.hudPowerups.innerHTML = '';
      const defs = [
        { key: 'magnet', label: '🧲 MAGNET', max: 12.0 },
        { key: 'sneakers', label: '👟 SUPER JUMP', max: 12.0 },
        { key: 'multiplier', label: '⭐ 2X BOOST', max: 15.0 },
        { key: 'hoverboard', label: '🛹 SHIELD', max: 15.0 }
      ];

      defs.forEach((def) => {
        const val = this.activePowerups[def.key];
        if (val > 0) {
          const pill = document.createElement('div');
          pill.className = `powerup-pill ${def.key}`;
          const pct = Math.max(0, Math.min(100, (val / def.max) * 100));
          pill.innerHTML = `
            <span style="font-size:0.75rem; font-weight:800">${def.label}</span>
            <div class="powerup-bar-wrap">
              <div class="powerup-bar-fill" style="width:${pct}%"></div>
            </div>
          `;
          this.hudPowerups.appendChild(pill);
        }
      });

      this.character.boardGroup.visible = this.activePowerups.hoverboard > 0;
    }

    updateHUD() {
      this.hudScore.textContent = Math.floor(this.score).toString().padStart(5, '0');
      this.hudCoins.textContent = this.coins.toString();
      this.hudHighScore.textContent = this.highScore.toString();
      const currentMult = (this.activePowerups.multiplier > 0 ? 2 : 1) * this.multiplier;
      this.hudMultiplier.textContent = `${currentMult}x`;
    }

    // ==========================================
    // PHYSICS & COLLISION DETECTION
    // ==========================================
    updatePlayer(delta) {
      // 1. Smooth Lane Lerping
      const laneDiff = this.targetX - this.playerX;
      this.playerX += laneDiff * Math.min(1, LANE_CHANGE_SPEED * delta);
      this.character.root.rotation.z = -laneDiff * 0.12;

      // 2. Sliding State
      if (this.isSliding) {
        this.slideTimer -= delta;
        if (this.slideTimer <= 0) {
          this.isSliding = false;
        }
      }

      // 3. Platform Detection (Train Roofs & Ramps)
      let detectedPlatformY = 0;
      for (let i = 0; i < this.obstacles.length; i++) {
        const obs = this.obstacles[i];
        if (obs.userData.type === 'train') {
          const tZ = obs.position.z;
          const tX = obs.position.x;
          const len = obs.userData.length;

          if (
            Math.abs(this.playerX - tX) < 1.15 &&
            this.playerZ <= tZ &&
            this.playerZ >= tZ - len
          ) {
            detectedPlatformY = TRAIN_HEIGHT;
            break;
          }

          if (
            obs.userData.hasRamp &&
            Math.abs(this.playerX - tX) < 1.15 &&
            this.playerZ <= tZ + obs.userData.rampLength &&
            this.playerZ >= tZ
          ) {
            const rampProgress = (tZ + obs.userData.rampLength - this.playerZ) / obs.userData.rampLength;
            detectedPlatformY = rampProgress * TRAIN_HEIGHT;
            break;
          }
        }
      }
      this.currentPlatformY = detectedPlatformY;

      // 4. Gravity & Vertical Movement
      this.playerY += this.velocityY * delta;
      this.velocityY -= GRAVITY * delta;

      if (this.playerY <= this.currentPlatformY) {
        this.playerY = this.currentPlatformY;
        this.velocityY = 0;
        this.isGrounded = true;
      } else {
        this.isGrounded = false;
      }

      this.character.root.position.set(this.playerX, this.playerY, this.playerZ);
      this.animateCharacter(delta);

      if (this.isGrounded && Math.random() < 0.35) {
        this.particleManager.spawnRunDust(this.playerX, this.playerY, this.playerZ);
      }
    }

    animateCharacter(delta) {
      if (this.isSliding) {
        this.character.root.scale.set(1.1, 0.45, 1.4);
        this.character.root.rotation.x = -0.55;
        this.character.leftLegGroup.rotation.x = 1.4;
        this.character.rightLegGroup.rotation.x = 1.4;
        this.character.leftArm.rotation.x = -1.2;
        this.character.rightArm.rotation.x = -1.2;
      } else if (!this.isGrounded) {
        this.character.root.scale.set(1, 1, 1);
        this.character.root.rotation.x = 0;
        this.character.leftLegGroup.rotation.x = 0.6;
        this.character.rightLegGroup.rotation.x = 0.6;
        this.character.leftArm.rotation.x = -1.1;
        this.character.rightArm.rotation.x = -1.1;
      } else if (this.activePowerups.hoverboard > 0) {
        this.character.root.scale.set(1, 1, 1);
        this.character.root.rotation.x = 0;
        this.character.root.rotation.y = 0.45;
        this.character.leftLegGroup.rotation.x = 0.2;
        this.character.rightLegGroup.rotation.x = -0.2;
        this.character.leftArm.rotation.z = 0.5;
        this.character.rightArm.rotation.z = -0.5;
      } else {
        this.character.root.scale.set(1, 1, 1);
        this.character.root.rotation.x = 0.15;
        this.character.root.rotation.y = 0;

        this.runAnimClock += delta * (this.speed * 0.7);
        const legAngle = Math.sin(this.runAnimClock) * 0.95;
        this.character.leftLegGroup.rotation.x = legAngle;
        this.character.rightLegGroup.rotation.x = -legAngle;

        this.character.leftArm.rotation.x = -legAngle * 0.85;
        this.character.rightArm.rotation.x = legAngle * 0.85;
        this.character.torso.position.y = 1.35 + Math.abs(Math.sin(this.runAnimClock * 2)) * 0.08;
      }
    }

    checkCollisions() {
      const pBox = {
        minX: this.playerX - 0.5,
        maxX: this.playerX + 0.5,
        minY: this.playerY,
        maxY: this.playerY + (this.isSliding ? 0.95 : 2.1),
        minZ: this.playerZ - 0.5,
        maxZ: this.playerZ + 0.5
      };

      // 1. Obstacle Collisions
      for (let i = 0; i < this.obstacles.length; i++) {
        const obs = this.obstacles[i];
        const type = obs.userData.type;
        const oX = obs.position.x;
        const oZ = obs.position.z;

        if (type === 'train') {
          const len = obs.userData.length;
          const hasRamp = obs.userData.hasRamp;

          if (
            Math.abs(this.playerX - oX) < 1.1 &&
            this.playerZ <= oZ + 0.4 &&
            this.playerZ >= oZ - len
          ) {
            if (this.playerY < TRAIN_HEIGHT - 0.4) {
              if (!hasRamp || this.playerZ < oZ) {
                this.handleCrash();
                return;
              }
            }
          }
        } else if (type === 'low_barrier') {
          if (
            Math.abs(this.playerX - oX) < 1.05 &&
            Math.abs(this.playerZ - oZ) < 0.65
          ) {
            if (this.playerY < 1.05) {
              this.handleCrash();
              return;
            }
          }
        } else if (type === 'high_barrier') {
          if (
            Math.abs(this.playerX - oX) < 1.15 &&
            Math.abs(this.playerZ - oZ) < 0.65
          ) {
            if (pBox.maxY > obs.userData.bounds.bottomY + 0.1) {
              this.handleCrash();
              return;
            }
          }
        }
      }

      // 2. Collectibles (3D Tech Coins & Power-ups)
      const magnetActive = this.activePowerups.magnet > 0;
      for (let i = this.collectibles.length - 1; i >= 0; i--) {
        const item = this.collectibles[i];
        const dist = item.position.distanceTo(new THREE.Vector3(this.playerX, this.playerY + 1.0, this.playerZ));

        // Coin Magnet Pull
        if (item.userData.type === 'coin' && magnetActive && dist < 22) {
          const dir = new THREE.Vector3(this.playerX, this.playerY + 1.0, this.playerZ).sub(item.position).normalize();
          item.position.addScaledVector(dir, 35 * 0.016);
        }

        // Collection radius
        if (dist < (item.userData.type === 'coin' ? 1.4 : 1.8)) {
          if (item.userData.type === 'coin') {
            const mult = this.activePowerups.multiplier > 0 ? 2 : 1;
            const lang = item.userData.lang;
            this.coins += item.userData.value * mult;
            this.score += 25 * mult;

            // Track collected language in player's Tech Stack
            if (lang && !this.collectedTech.has(lang.id)) {
              this.collectedTech.add(lang.id);
              localStorage.setItem('subway_tech_stack', JSON.stringify([...this.collectedTech]));
              this.updateTechStackHUD();
            }

            if (lang) {
              this.triggerTechToast(lang);
              const colorInt = parseInt(lang.bg.replace('#', '0x'), 16) || 0xffd700;
              this.particleManager.spawnCoinBurst(item.position.x, item.position.y, item.position.z, colorInt);
            } else {
              this.particleManager.spawnCoinBurst(item.position.x, item.position.y, item.position.z);
            }
          } else if (item.userData.type === 'powerup') {
            const pType = item.userData.powerupType;
            this.activePowerups[pType] = pType === 'hoverboard' ? 15.0 : 12.0;
            this.updatePowerupHUD();
          }

          this.scene.remove(item);
          this.collectibles.splice(i, 1);
          this.updateHUD();
        }
      }
    }

    handleCrash() {
      if (this.activePowerups.hoverboard > 0) {
        this.activePowerups.hoverboard = 0;
        this.cameraShake = 0.5;
        this.updatePowerupHUD();
        this.playerY = this.currentPlatformY;
        this.velocityY = 8;
        return;
      }

      this.triggerGameOver();
    }

    // ==========================================
    // MAIN GAME LOOP
    // ==========================================
    loop(currentTime) {
      requestAnimationFrame((t) => this.loop(t));

      const delta = Math.min((currentTime - this.lastTime) / 1000, 0.1);
      this.lastTime = currentTime;

      if (this.state === 'PLAYING') {
        if (this.speed < MAX_SPEED) {
          this.speed += SPEED_ACCELERATION * delta;
        }

        const distanceStep = this.speed * delta;
        this.playerZ -= distanceStep;
        this.distanceTraveled += distanceStep;
        const currentMultiplier = (this.activePowerups.multiplier > 0 ? 2 : 1) * this.multiplier;
        this.score += (distanceStep * 0.5) * currentMultiplier;

        let powerupChanged = false;
        Object.keys(this.activePowerups).forEach((k) => {
          if (this.activePowerups[k] > 0) {
            this.activePowerups[k] -= delta;
            if (this.activePowerups[k] <= 0) {
              this.activePowerups[k] = 0;
            }
            powerupChanged = true;
          }
        });
        if (powerupChanged) {
          this.updatePowerupHUD();
        }

        // Update Moving Oncoming Trains
        for (let i = 0; i < this.obstacles.length; i++) {
          const obs = this.obstacles[i];
          if (obs.userData.isMoving) {
            obs.position.z += obs.userData.speed * delta;
          }
        }

        // Realistic 3D Coin Rotation & Floating Bob
        for (let i = 0; i < this.collectibles.length; i++) {
          const item = this.collectibles[i];
          item.rotation.y += 3.2 * delta;
          item.position.y += Math.sin(currentTime * 0.005 + i) * 0.002;
        }

        this.updatePlayer(delta);
        this.checkCollisions();

        if (this.playerZ - CHUNK_LENGTH * 2 < this.nextChunkZ) {
          this.spawnChunk();
        }

        // Garbage collection
        while (this.chunks.length > 0 && this.chunks[0].position.z > this.playerZ + CHUNK_LENGTH + 20) {
          const oldChunk = this.chunks.shift();
          this.scene.remove(oldChunk);
        }

        for (let i = this.obstacles.length - 1; i >= 0; i--) {
          if (this.obstacles[i].position.z > this.playerZ + 30) {
            this.scene.remove(this.obstacles[i]);
            this.obstacles.splice(i, 1);
          }
        }

        for (let i = this.collectibles.length - 1; i >= 0; i--) {
          if (this.collectibles[i].position.z > this.playerZ + 30) {
            this.scene.remove(this.collectibles[i]);
            this.collectibles.splice(i, 1);
          }
        }

        this.updateHUD();
      }

      this.particleManager.update(delta);

      // Camera Follow
      const targetCamZ = this.playerZ + 7.5;
      const targetCamY = Math.max(3.8, this.playerY + 3.8);
      this.camera.position.z += (targetCamZ - this.camera.position.z) * 0.15;
      this.camera.position.y += (targetCamY - this.camera.position.y) * 0.15;
      this.camera.position.x += (this.playerX * 0.4 - this.camera.position.x) * 0.12;

      if (this.cameraShake > 0) {
        this.camera.position.x += (Math.random() - 0.5) * this.cameraShake;
        this.camera.position.y += (Math.random() - 0.5) * this.cameraShake;
        this.cameraShake = Math.max(0, this.cameraShake - delta * 2.0);
      }

      this.camera.lookAt(this.playerX * 0.3, this.playerY + 1.6, this.playerZ - 12);

      this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
    }
  }

  window.addEventListener('DOMContentLoaded', () => {
    new SubwayGame();
  });
})();
