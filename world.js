/**
 * 3D MINECRAFT WORLD & CHARACTER ENGINE (Three.js)
 * True blocky Minecraft characters with realistic proportions,
 * animated pulling physics, voxel arena, dynamic sky, and spectators.
 */

class MinecraftWorld {
  constructor(container) {
    this.container = container;
    this.scene = null;
    this.camera = null;
    this.renderer = null;

    // Game objects
    this.teamACharacters = []; // Left team
    this.teamBCharacters = []; // Right team
    this.ropeGroup = null;
    this.ropeMesh = null;
    this.ropeRibbon = null;
    this.clouds = [];
    this.spectators = [];
    this.particles = [];
    this.fallbackParticles = [];
    this.fallbackClouds = [];
    this.fallbackCanvas = null;
    this.fallbackContext = null;
    this.isFallbackRenderer = false;
    this.isPaused = false;
    this.animationTime = 0;

    // State
    this.ropeOffset = 0; // -X pulls left, +X pulls right
    this.targetRopeOffset = 0;
    this.pullingTeam = null; // 'A' or 'B' or null
    this.isVictory = false;
    this.winningTeam = null;

    this.clock = new THREE.Clock();
    this.init();
  }

  init() {
    this.animate = this.animate.bind(this);

    // 1. Scene setup
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x78a7ff); // Bright Minecraft blue sky
    this.scene.fog = new THREE.Fog(0x9ec9ef, 48, 115);

    // 2. Camera setup (isometric-style diagonal action view)
    const aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera = new THREE.PerspectiveCamera(39, aspect, 0.1, 200);
    this.camera.position.set(0, 7.1, 16.4);
    this.camera.lookAt(0, 1.2, 0);

    // 3. Renderer setup
    try {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('webgl2', { antialias: true, alpha: false })
        || canvas.getContext('webgl', { antialias: true, alpha: false });
      if (!context) {
        this.initFallbackRenderer();
        return;
      }
      this.renderer = new THREE.WebGLRenderer({ canvas, context, antialias: true, alpha: false });
    } catch (error) {
      console.warn('WebGL tidak tersedia; menggunakan arena voxel 2D sebagai pengganti.', error);
      this.initFallbackRenderer();
      return;
    }
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.container.appendChild(this.renderer.domElement);

    // 4. Lights
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x589b33, 0.75);
    this.scene.add(hemiLight);

    const sunLight = new THREE.DirectionalLight(0xfffae0, 1.1);
    sunLight.position.set(15, 25, 12);
    sunLight.castShadow = true;
    sunLight.intensity = 1.35;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.bias = -0.00025;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 70;
    sunLight.shadow.camera.left = -20;
    sunLight.shadow.camera.right = 20;
    sunLight.shadow.camera.top = 20;
    sunLight.shadow.camera.bottom = -10;
    this.scene.add(sunLight);

    // 5. Build Environment
    this.buildSkyElements();
    this.buildTerrain();
    this.buildTreesAndDecor();
    this.buildSpectators();
    this.buildRope();

    // 6. Spawn Teams (5 characters each!)
    this.spawnTeams();

    // 7. Event listeners
    window.addEventListener('resize', () => this.onResize());

    // 8. Start loop
    requestAnimationFrame(this.animate);
  }

  initFallbackRenderer() {
    this.isFallbackRenderer = true;
    this.fallbackCanvas = document.createElement('canvas');
    this.fallbackCanvas.className = 'voxel-fallback';
    this.fallbackCanvas.setAttribute('aria-label', 'Arena tarik tambang voxel dengan lima karakter di setiap tim');
    this.fallbackContext = this.fallbackCanvas.getContext('2d');
    if (!this.fallbackContext) {
      throw new Error('Browser ini tidak mendukung Canvas 2D untuk menampilkan arena.');
    }
    this.container.appendChild(this.fallbackCanvas);

    const makeTeam = (team, positions, palette) => positions.map((x, index) => ({
      position: { x, y: 0 },
      rotation: { set() {} },
      userData: {
        baseX: x,
        baseZ: index * 0.1,
        team,
        palette: palette[index % palette.length],
        pullExertion: 0,
        stumble: 0,
        phase: index * 0.8
      }
    }));
    this.teamACharacters = makeTeam('A', [-8.4, -6.8, -5.2, -3.6, -2], [
      { shirt: '#168f91', side: '#096c72', front: '#20a9a4', sleeve: '#157c82', hair: '#4a3219', armor: '#36c4bd', highlight: '#8ffff0', shadow: '#147c83' },
      { shirt: '#347aa3', side: '#245676', front: '#438eb9', sleeve: '#286385', hair: '#603d25' },
      { shirt: '#158c7d', side: '#0d675f', front: '#21a895', sleeve: '#11756b', hair: '#39271b', armor: '#aebbc1', highlight: '#f3f6ed', shadow: '#657b8a' }
    ]);
    this.teamBCharacters = makeTeam('B', [2, 3.6, 5.2, 6.8, 8.4], [
      { shirt: '#b97925', side: '#84511e', front: '#d59a32', sleeve: '#a76722', hair: '#b35222', armor: '#e9c847', highlight: '#fff197', shadow: '#9c771c' },
      { shirt: '#8d5131', side: '#623a2b', front: '#a9673d', sleeve: '#7a442d', hair: '#8b3f21' },
      { shirt: '#c28a2f', side: '#805922', front: '#dcae44', sleeve: '#a9792a', hair: '#a94c24', armor: '#e1bd37', highlight: '#fff197', shadow: '#9b761b' }
    ]);
    this.fallbackClouds = Array.from({ length: 7 }, (_, index) => ({
      x: index * 190 - 80,
      y: 55 + (index % 3) * 44,
      speed: 5 + (index % 3) * 2
    }));
    window.addEventListener('resize', () => this.onResize());
    this.onResize();
    requestAnimationFrame(this.animate);
  }

  onResize() {
    if (!this.container) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    if (this.isFallbackRenderer && this.fallbackCanvas && this.fallbackContext) {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      this.fallbackCanvas.width = width * pixelRatio;
      this.fallbackCanvas.height = height * pixelRatio;
      this.fallbackContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      return;
    }
    if (!this.renderer || !this.camera) return;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  // --- SKY & CLOUDS ---
  buildSkyElements() {
    // Cubic Minecraft Sun
    const sunGeo = new THREE.BoxGeometry(3, 3, 0.2);
    const sunMat = new THREE.MeshBasicMaterial({ color: 0xffea4e });
    const sunMesh = new THREE.Mesh(sunGeo, sunMat);
    sunMesh.position.set(12, 28, -25);
    sunMesh.rotation.y = -0.3;
    this.scene.add(sunMesh);

    // Floating Minecraft 3D Clouds (blocky slabs)
    const cloudMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.88
    });

    for (let i = 0; i < 8; i++) {
      const w = 8 + Math.random() * 12;
      const d = 6 + Math.random() * 8;
      const cloudGeo = new THREE.BoxGeometry(w, 1.2, d);
      const cloud = new THREE.Mesh(cloudGeo, cloudMat);
      cloud.position.set(
        (Math.random() - 0.5) * 80,
        22 + Math.random() * 6,
        -15 + (Math.random() - 0.5) * 40
      );
      cloud.userData = { speed: 0.015 + Math.random() * 0.02 };
      this.clouds.push(cloud);
      this.scene.add(cloud);
    }
  }

  // --- TERRAIN ---
  buildTerrain() {
    const grassTop = mcTextures.getGrassTop();
    const grassSide = mcTextures.getGrassSide();
    const dirt = mcTextures.getDirt();
    const stone = mcTextures.getStone();
    const cobblestone = mcTextures.getCobblestone();

    // Minecraft Grass Block Multi-material
    const grassMat = [
      new THREE.MeshLambertMaterial({ map: grassSide }), // Right
      new THREE.MeshLambertMaterial({ map: grassSide }), // Left
      new THREE.MeshLambertMaterial({ map: grassTop }),  // Top
      new THREE.MeshLambertMaterial({ map: dirt }),      // Bottom
      new THREE.MeshLambertMaterial({ map: grassSide }), // Front
      new THREE.MeshLambertMaterial({ map: grassSide })  // Back
    ];

    // Main Field Ground
    const groundGeo = new THREE.BoxGeometry(50, 2, 20);
    const ground = new THREE.Mesh(groundGeo, grassMat);
    ground.position.set(0, -1, 0);
    ground.receiveShadow = true;
    this.scene.add(ground);

    // Tug-of-War Track (Cobblestone / Dirt Path in center)
    const trackGeo = new THREE.BoxGeometry(26, 0.05, 4);
    const trackMat = new THREE.MeshLambertMaterial({ map: cobblestone });
    const track = new THREE.Mesh(trackGeo, trackMat);
    track.position.set(0, 0.02, 0);
    track.receiveShadow = true;
    this.scene.add(track);

    // Center dividing line (White Wool)
    const centerLineGeo = new THREE.BoxGeometry(0.4, 0.08, 4.2);
    const whiteWoolMat = new THREE.MeshLambertMaterial({ map: mcTextures.getWool('#f0f0f0') });
    const centerLine = new THREE.Mesh(centerLineGeo, whiteWoolMat);
    centerLine.position.set(0, 0.04, 0);
    this.scene.add(centerLine);

    // Left Team Win Marker (Red Wool)
    const leftMarkerGeo = new THREE.BoxGeometry(0.4, 0.08, 4.2);
    const redWoolMat = new THREE.MeshLambertMaterial({ map: mcTextures.getWool('#cf2828') });
    const leftMarker = new THREE.Mesh(leftMarkerGeo, redWoolMat);
    leftMarker.position.set(-5, 0.04, 0);
    this.scene.add(leftMarker);

    // Right Team Win Marker (Blue Wool)
    const rightMarkerGeo = new THREE.BoxGeometry(0.4, 0.08, 4.2);
    const blueWoolMat = new THREE.MeshLambertMaterial({ map: mcTextures.getWool('#286acf') });
    const rightMarker = new THREE.Mesh(rightMarkerGeo, blueWoolMat);
    rightMarker.position.set(5, 0.04, 0);
    this.scene.add(rightMarker);

    // Wooden sideline fences
    this.buildFences();
  }

  buildFences() {
    const oakLog = mcTextures.getOakLogSide();
    const fenceMat = new THREE.MeshLambertMaterial({ map: oakLog });

    // Back fence posts
    for (let x = -18; x <= 18; x += 3) {
      const postGeo = new THREE.BoxGeometry(0.3, 1.2, 0.3);
      const post = new THREE.Mesh(postGeo, fenceMat);
      post.position.set(x, 0.6, -3.2);
      post.castShadow = true;
      this.scene.add(post);

      if (x < 18) {
        const railGeo = new THREE.BoxGeometry(3, 0.15, 0.15);
        const rail1 = new THREE.Mesh(railGeo, fenceMat);
        rail1.position.set(x + 1.5, 0.45, -3.2);
        const rail2 = new THREE.Mesh(railGeo, fenceMat);
        rail2.position.set(x + 1.5, 0.85, -3.2);
        this.scene.add(rail1);
        this.scene.add(rail2);
      }
    }
  }

  // --- TREES & DECORATIONS ---
  buildTreesAndDecor() {
    const logTex = mcTextures.getOakLogSide();
    const leafTex = mcTextures.getOakLeaves();

    const treePositions = [
      { x: -16, z: -7 },
      { x: -10, z: -9 },
      { x: 10, z: -8 },
      { x: 17, z: -6 },
      { x: -22, z: -2 },
      { x: 22, z: -3 }
    ];

    treePositions.forEach(pos => {
      const treeGroup = new THREE.Group();

      // Trunk (4 oak blocks stacked)
      const trunkMat = new THREE.MeshLambertMaterial({ map: logTex });
      const trunkGeo = new THREE.BoxGeometry(0.8, 3.2, 0.8);
      const trunk = new THREE.Mesh(trunkGeo, trunkMat);
      trunk.position.set(0, 1.6, 0);
      trunk.castShadow = true;
      treeGroup.add(trunk);

      // Leaves (blocky 3D canopy)
      const leafMat = new THREE.MeshLambertMaterial({ map: leafTex });
      const leafLowerGeo = new THREE.BoxGeometry(3.2, 1.6, 3.2);
      const leafLower = new THREE.Mesh(leafLowerGeo, leafMat);
      leafLower.position.set(0, 3.6, 0);
      leafLower.castShadow = true;
      treeGroup.add(leafLower);

      const leafUpperGeo = new THREE.BoxGeometry(1.8, 1.2, 1.8);
      const leafUpper = new THREE.Mesh(leafUpperGeo, leafMat);
      leafUpper.position.set(0, 4.8, 0);
      leafUpper.castShadow = true;
      treeGroup.add(leafUpper);

      treeGroup.position.set(pos.x, 0, pos.z);
      this.scene.add(treeGroup);
    });

    // Minecraft Flowers (Dandelions & Poppies)
    const redMat = new THREE.MeshLambertMaterial({ color: 0xdb2424 });
    const yellowMat = new THREE.MeshLambertMaterial({ color: 0xf5d42c });

    for (let i = 0; i < 20; i++) {
      const flowerGroup = new THREE.Group();
      const stemGeo = new THREE.BoxGeometry(0.08, 0.4, 0.08);
      const stemMat = new THREE.MeshLambertMaterial({ color: 0x4d7c2a });
      const stem = new THREE.Mesh(stemGeo, stemMat);
      stem.position.y = 0.2;
      flowerGroup.add(stem);

      const petalGeo = new THREE.BoxGeometry(0.3, 0.3, 0.3);
      const petal = new THREE.Mesh(petalGeo, (i % 2 === 0) ? redMat : yellowMat);
      petal.position.y = 0.45;
      flowerGroup.add(petal);

      const fx = (Math.random() - 0.5) * 36;
      const fz = 3.5 + Math.random() * 3.5;
      flowerGroup.position.set(fx, 0, fz);
      this.scene.add(flowerGroup);
    }
  }

  // --- SPECTATORS (Minecraft Pig & Sheep) ---
  buildSpectators() {
    // 2 Cheering Pigs
    const pigTex = mcTextures.getPigTexture();
    const pigMat = new THREE.MeshLambertMaterial({ map: pigTex });

    const createPig = (x, z) => {
      const pig = new THREE.Group();
      // Body
      const body = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.8, 1.6), pigMat);
      body.position.y = 0.7;
      body.castShadow = true;
      pig.add(body);
      // Head
      const head = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.7, 0.7), pigMat);
      head.position.set(0, 1.0, 0.9);
      head.castShadow = true;
      pig.add(head);
      // Legs
      for (let lx of [-0.4, 0.4]) {
        for (let lz of [-0.5, 0.5]) {
          const leg = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.5, 0.3), pigMat);
          leg.position.set(lx, 0.25, lz);
          pig.add(leg);
        }
      }
      pig.position.set(x, 0, z);
      pig.userData = { baseY: 0, hopOffset: Math.random() * 6 };
      this.spectators.push(pig);
      this.scene.add(pig);
    };

    createPig(-8, -4.2);
    createPig(8, -4.2);

    // 2 Cheering Sheep
    const sheepTex = mcTextures.getSheepTexture();
    const sheepMat = new THREE.MeshLambertMaterial({ map: sheepTex });

    const createSheep = (x, z) => {
      const sheep = new THREE.Group();
      const body = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.9, 1.7), sheepMat);
      body.position.y = 0.85;
      body.castShadow = true;
      sheep.add(body);

      const head = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.65, 0.75), sheepMat);
      head.position.set(0, 1.15, 1.0);
      head.castShadow = true;
      sheep.add(head);

      for (let lx of [-0.4, 0.4]) {
        for (let lz of [-0.5, 0.5]) {
          const leg = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.6, 0.28), sheepMat);
          leg.position.set(lx, 0.3, lz);
          sheep.add(leg);
        }
      }
      sheep.position.set(x, 0, z);
      sheep.userData = { baseY: 0, hopOffset: Math.random() * 6 };
      this.spectators.push(sheep);
      this.scene.add(sheep);
    };

    createSheep(-13, -4.5);
    createSheep(13, -4.5);
  }

  // --- THE ROPE ---
  buildRope() {
    this.ropeGroup = new THREE.Group();

    // Long braided rope cylinder / block
    const ropeTex = mcTextures.getRope();
    const ropeMat = new THREE.MeshLambertMaterial({ map: ropeTex });
    // Rope length 24 units, diameter 0.18
    const ropeGeo = new THREE.CylinderGeometry(0.09, 0.09, 26, 8);
    ropeGeo.rotateZ(Math.PI / 2); // Lay horizontal along X
    this.ropeMesh = new THREE.Mesh(ropeGeo, ropeMat);
    this.ropeMesh.position.set(0, 0.85, 0);
    this.ropeMesh.castShadow = true;
    this.ropeGroup.add(this.ropeMesh);

    // Center Red Ribbon Marker
    const ribbonGeo = new THREE.BoxGeometry(0.25, 0.55, 0.25);
    const ribbonMat = new THREE.MeshLambertMaterial({ color: 0xee2222 });
    this.ropeRibbon = new THREE.Mesh(ribbonGeo, ribbonMat);
    this.ropeRibbon.position.set(0, 0.72, 0);
    this.ropeRibbon.castShadow = true;
    this.ropeGroup.add(this.ropeRibbon);

    this.scene.add(this.ropeGroup);
  }

  // --- MINECRAFT CHARACTERS CREATION ---
  createMinecraftCharacter(options = {}) {
    const char = new THREE.Group();

    const isSteve = options.type === 'steve';
    const isDiamond = options.armor === 'diamond';
    const isGold = options.armor === 'gold';
    const isIron = options.armor === 'iron';

    // Face / Head textures
    const headMat = isSteve
      ? [
          new THREE.MeshLambertMaterial({ color: 0x9e7054 }), // Right
          new THREE.MeshLambertMaterial({ color: 0xbc8b68 }), // Left
          new THREE.MeshLambertMaterial({ color: 0x4a3219 }), // Top (Hair)
          new THREE.MeshLambertMaterial({ color: 0xbc8b68 }), // Bottom (Neck)
          new THREE.MeshLambertMaterial({ map: mcTextures.getSteveFace() }), // Front (Face)
          new THREE.MeshLambertMaterial({ color: 0x4a3219 })  // Back (Hair)
        ]
      : [
          new THREE.MeshLambertMaterial({ color: 0xe0b898 }),
          new THREE.MeshLambertMaterial({ color: 0xf2cead }),
          new THREE.MeshLambertMaterial({ color: 0xb35222 }), // Top
          new THREE.MeshLambertMaterial({ color: 0xf2cead }), // Bottom
          new THREE.MeshLambertMaterial({ map: mcTextures.getAlexFace() }),
          new THREE.MeshLambertMaterial({ color: 0xb35222 })
        ];

    const bodyMat = isSteve
      ? new THREE.MeshLambertMaterial({ map: mcTextures.getSteveBody() })
      : new THREE.MeshLambertMaterial({ map: mcTextures.getAlexBody() });
    const armorTexture = isDiamond
      ? mcTextures.getDiamondArmor()
      : isGold ? mcTextures.getGoldArmor() : isIron ? mcTextures.getIronArmor() : null;
    const armorMat = armorTexture ? new THREE.MeshLambertMaterial({ map: armorTexture }) : null;

    const armMat = isSteve
      ? new THREE.MeshLambertMaterial({ map: mcTextures.getSteveArm() })
      : new THREE.MeshLambertMaterial({ map: mcTextures.getAlexArm() });

    const legMat = isSteve
      ? new THREE.MeshLambertMaterial({ map: mcTextures.getSteveLeg() })
      : new THREE.MeshLambertMaterial({ map: mcTextures.getAlexLeg() });

    // 1. Torso (0.75w x 1.1h x 0.4d)
    const torso = new THREE.Mesh(new THREE.BoxGeometry(0.75, 1.1, 0.4), bodyMat);
    torso.position.y = 1.25;
    torso.castShadow = true;
    char.add(torso);

    if (armorMat) {
      const chestplate = new THREE.Mesh(new THREE.BoxGeometry(0.79, 0.68, 0.46), armorMat);
      chestplate.position.set(0, 1.38, 0.025);
      chestplate.castShadow = true;
      char.add(chestplate);

      [-0.48, 0.48].forEach(x => {
        const shoulderPad = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.3, 0.44), armorMat);
        shoulderPad.position.set(x, 1.65, 0);
        shoulderPad.castShadow = true;
        char.add(shoulderPad);
      });
    }

    // 2. Head (0.7w x 0.7h x 0.7d)
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.7, 0.7), headMat);
    head.position.y = 2.15;
    head.castShadow = true;
    char.add(head);

    // If helmet
    if (isDiamond || isGold || isIron) {
      const helmet = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.28, 0.78), armorMat);
      helmet.position.y = 2.48;
      helmet.castShadow = true;
      char.add(helmet);
    }

    // 3. Arms (Pivot at shoulder)
    const leftArmGroup = new THREE.Group();
    leftArmGroup.position.set(-0.52, 1.7, 0);
    const leftArm = new THREE.Mesh(new THREE.BoxGeometry(0.35, 1.0, 0.35), armMat);
    leftArm.position.y = -0.45;
    leftArm.castShadow = true;
    leftArmGroup.add(leftArm);
    char.add(leftArmGroup);

    const rightArmGroup = new THREE.Group();
    rightArmGroup.position.set(0.52, 1.7, 0);
    const rightArm = new THREE.Mesh(new THREE.BoxGeometry(0.35, 1.0, 0.35), armMat);
    rightArm.position.y = -0.45;
    rightArm.castShadow = true;
    rightArmGroup.add(rightArm);
    char.add(rightArmGroup);

    // 4. Legs
    const leftLegGroup = new THREE.Group();
    leftLegGroup.position.set(-0.2, 0.7, 0);
    const leftLeg = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.9, 0.35), legMat);
    leftLeg.position.y = -0.35;
    leftLeg.castShadow = true;
    leftLegGroup.add(leftLeg);
    char.add(leftLegGroup);

    const rightLegGroup = new THREE.Group();
    rightLegGroup.position.set(0.2, 0.7, 0);
    const rightLeg = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.9, 0.35), legMat);
    rightLeg.position.y = -0.35;
    rightLeg.castShadow = true;
    rightLegGroup.add(rightLeg);
    char.add(rightLegGroup);

    // References for dynamic animation
    char.userData = {
      baseX: options.x || 0,
      baseZ: options.z || 0,
      team: options.team, // 'A' or 'B'
      torso,
      head,
      leftArmGroup,
      rightArmGroup,
      leftLegGroup,
      rightLegGroup,
      stumble: 0,
      pullExertion: 0
    };

    char.position.set(options.x || 0, 0, options.z || 0);

    return char;
  }

  // --- SPAWN BOTH TEAMS (5 characters each!) ---
  spawnTeams() {
    // Team A (Left side - Steve Team)
    // Pulls to the left (-X)
    const teamAConfigs = [
      { type: 'steve', armor: 'diamond', offset: -2.0, z: 0.1 },
      { type: 'steve', armor: 'none',    offset: -3.6, z: -0.1 },
      { type: 'steve', armor: 'iron',    offset: -5.2, z: 0.1 },
      { type: 'steve', armor: 'none',    offset: -6.8, z: -0.1 },
      { type: 'steve', armor: 'diamond', offset: -8.4, z: 0.05 }
    ];

    teamAConfigs.forEach((cfg, idx) => {
      const char = this.createMinecraftCharacter({
        team: 'A',
        type: cfg.type,
        armor: cfg.armor,
        x: cfg.offset,
        z: cfg.z
      });
      // Facing the rope center (facing +X) with lean backward (-Z/X)
      char.rotation.y = Math.PI / 3; // Face toward the rope and slightly toward the camera
      this.teamACharacters.push(char);
      this.scene.add(char);
    });

    // Team B (Right side - Alex Team)
    // Pulls to the right (+X)
    const teamBConfigs = [
      { type: 'alex', armor: 'gold', offset: 2.0, z: -0.1 },
      { type: 'alex', armor: 'none', offset: 3.6, z: 0.1 },
      { type: 'alex', armor: 'gold', offset: 5.2, z: -0.1 },
      { type: 'alex', armor: 'none', offset: 6.8, z: 0.1 },
      { type: 'alex', armor: 'gold', offset: 8.4, z: -0.05 }
    ];

    teamBConfigs.forEach((cfg, idx) => {
      const char = this.createMinecraftCharacter({
        team: 'B',
        type: cfg.type,
        armor: cfg.armor,
        x: cfg.offset,
        z: cfg.z
      });
      // Facing towards center (-X)
      char.rotation.y = -Math.PI / 3;
      this.teamBCharacters.push(char);
      this.scene.add(char);
    });
  }

  // --- PULL / TUG MECHANICS ---
  triggerTug(team) {
    this.pullingTeam = team;
    
    // Spawn dust particles from characters' boots
    const characters = (team === 'A') ? this.teamACharacters : this.teamBCharacters;
    characters.forEach(c => {
      c.userData.pullExertion = 1.0;
      this.spawnDust(c.position.x, 0.15, c.position.z);
    });

    // Opposing team stumbles slightly forward
    const opposing = (team === 'A') ? this.teamBCharacters : this.teamACharacters;
    opposing.forEach(c => {
      c.userData.stumble = 0.8;
    });

    // Camera micro-shake
    this.cameraShake = 0.15;
  }

  setRopePosition(value) {
    // value ranges from e.g. -5 (Team A wins) to +5 (Team B wins)
    this.targetRopeOffset = value;
  }

  spawnDust(x, y, z) {
    for (let i = 0; i < 4; i++) {
      if (this.isFallbackRenderer) {
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;
        this.fallbackParticles.push({
          x: width / 2 + x * width / 26,
          y: height * 0.47,
          vx: (Math.random() - 0.5) * 1.4,
          vy: -1.2 - Math.random() * 1.5,
          life: 0.7
        });
        continue;
      }
      const pGeo = new THREE.BoxGeometry(0.12, 0.12, 0.12);
      const pMat = new THREE.MeshBasicMaterial({ color: 0x866043 });
      const p = new THREE.Mesh(pGeo, pMat);
      p.position.set(x + (Math.random() - 0.5) * 0.4, y, z + (Math.random() - 0.5) * 0.4);
      p.userData = {
        vx: (Math.random() - 0.5) * 0.05,
        vy: 0.03 + Math.random() * 0.04,
        vz: (Math.random() - 0.5) * 0.05,
        life: 25
      };
      this.particles.push(p);
      this.scene.add(p);
    }
  }

  spawnFirework() {
    const colors = [0xff2222, 0x22ff22, 0x2288ff, 0xffea00, 0xff00ea, 0x00ffff];
    if (this.isFallbackRenderer) {
      const width = this.container.clientWidth;
      const height = this.container.clientHeight;
      for (let i = 0; i < 35; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 35 + Math.random() * 75;
        this.fallbackParticles.push({
          x: width * (0.2 + Math.random() * 0.6),
          y: height * (0.12 + Math.random() * 0.18),
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1.3,
          color: `#${colors[Math.floor(Math.random() * colors.length)].toString(16).padStart(6, '0')}`
        });
      }
      return;
    }
    const fx = (Math.random() - 0.5) * 16;
    const fy = 8 + Math.random() * 6;
    const fz = -2 + (Math.random() - 0.5) * 6;

    for (let i = 0; i < 35; i++) {
      const pGeo = new THREE.BoxGeometry(0.2, 0.2, 0.2);
      const col = colors[Math.floor(Math.random() * colors.length)];
      const pMat = new THREE.MeshBasicMaterial({ color: col });
      const p = new THREE.Mesh(pGeo, pMat);
      p.position.set(fx, fy, fz);

      const angle = Math.random() * Math.PI * 2;
      const speed = 0.08 + Math.random() * 0.14;
      p.userData = {
        vx: Math.cos(angle) * speed,
        vy: (Math.random() - 0.2) * speed * 1.5,
        vz: Math.sin(angle) * speed,
        life: 45
      };
      this.particles.push(p);
      this.scene.add(p);
    }
  }

  setVictory(winnerTeam) {
    this.isVictory = true;
    this.winningTeam = winnerTeam;
  }

  setPaused(paused) {
    this.isPaused = paused;
  }

  reset() {
    this.ropeOffset = 0;
    this.targetRopeOffset = 0;
    this.animationTime = 0;
    this.pullingTeam = null;
    this.isVictory = false;
    this.winningTeam = null;
    this.particles.forEach(particle => this.scene && this.scene.remove(particle));
    this.particles.length = 0;
    this.fallbackParticles.length = 0;

    // Reset character positions
    this.teamACharacters.forEach(c => {
      c.position.x = c.userData.baseX;
      c.userData.stumble = 0;
      c.userData.pullExertion = 0;
      c.rotation.set(0, Math.PI / 3, 0);
    });

    this.teamBCharacters.forEach(c => {
      c.position.x = c.userData.baseX;
      c.userData.stumble = 0;
      c.userData.pullExertion = 0;
      c.rotation.set(0, -Math.PI / 3, 0);
    });

    if (this.ropeGroup) {
      this.ropeGroup.position.x = 0;
    }
  }

  // --- ANIMATION FRAME LOOP ---
  animate() {
    requestAnimationFrame(this.animate);
    const delta = this.clock.getDelta();
    if (this.isFallbackRenderer) {
      this.animateFallback(delta);
      return;
    }
    if (this.isPaused) {
      this.renderer.render(this.scene, this.camera);
      return;
    }
    this.animationTime += delta;
    const time = this.animationTime;

    // 1. Smooth rope movement
    this.ropeOffset += (this.targetRopeOffset - this.ropeOffset) * 0.12;
    if (this.ropeGroup) {
      this.ropeGroup.position.x = this.ropeOffset;
      // Slight vertical bounce during movement
      this.ropeGroup.position.y = Math.sin(time * 12) * 0.02;
    }

    // 2. Clouds horizontal drifting
    this.clouds.forEach(cloud => {
      cloud.position.x += cloud.userData.speed;
      if (cloud.position.x > 45) cloud.position.x = -45;
    });

    // 3. Spectator animals hop & cheer
    this.spectators.forEach(sp => {
      const hop = Math.max(0, Math.sin(time * 4 + sp.userData.hopOffset)) * 0.25;
      sp.position.y = sp.userData.baseY + hop;
    });

    // 4. Update Character Animations
    // Team A (Steve)
    this.teamACharacters.forEach((char, idx) => {
      // Follow the rope offset
      char.position.x = char.userData.baseX + this.ropeOffset;

      if (this.isVictory) {
        if (this.winningTeam === null) {
          char.position.y = Math.sin(time * 3 + idx) * 0.03;
          char.rotation.z = 0;
          char.userData.head.rotation.x = 0;
        } else if (this.winningTeam === 'A') {
          // Jumping victory dance!
          char.position.y = Math.max(0, Math.sin(time * 8 + idx)) * 0.6;
          char.userData.leftArmGroup.rotation.x = -Math.PI * 0.8; // Arms raised high
          char.userData.rightArmGroup.rotation.x = -Math.PI * 0.8;
          char.userData.head.rotation.y = Math.sin(time * 6) * 0.3;
        } else {
          // Defeated sad slump
          char.position.y = 0;
          char.rotation.z = 0.4;
          char.userData.head.rotation.x = 0.4;
        }
      } else {
        // Active Tug-of-war pulling stance
        char.userData.pullExertion *= 0.92;
        char.userData.stumble *= 0.90;

        // Lean back angle (tug of war exertion)
        const baseLean = -0.35 - (char.userData.pullExertion * 0.35) + (char.userData.stumble * 0.4);
        char.rotation.z = baseLean; // leans back along X direction

        // Breathing / tension bob
        const breathe = Math.sin(time * 3 + idx * 0.5) * 0.03;
        char.position.y = breathe;

        // Arms gripping the rope forward
        char.userData.leftArmGroup.rotation.x = -0.9 + Math.sin(time * 6) * 0.05;
        char.userData.rightArmGroup.rotation.x = -0.7 - Math.sin(time * 6) * 0.05;

        // Legs braced apart
        char.userData.leftLegGroup.rotation.x = 0.4;
        char.userData.rightLegGroup.rotation.x = -0.3;
      }
    });

    // Team B (Alex)
    this.teamBCharacters.forEach((char, idx) => {
      char.position.x = char.userData.baseX + this.ropeOffset;

      if (this.isVictory) {
        if (this.winningTeam === null) {
          char.position.y = Math.sin(time * 3 + idx) * 0.03;
          char.rotation.z = 0;
          char.userData.head.rotation.x = 0;
        } else if (this.winningTeam === 'B') {
          // Jumping victory dance!
          char.position.y = Math.max(0, Math.sin(time * 8 + idx)) * 0.6;
          char.userData.leftArmGroup.rotation.x = -Math.PI * 0.8;
          char.userData.rightArmGroup.rotation.x = -Math.PI * 0.8;
          char.userData.head.rotation.y = Math.sin(time * 6) * 0.3;
        } else {
          // Defeated sad slump
          char.position.y = 0;
          char.rotation.z = -0.4;
          char.userData.head.rotation.x = 0.4;
        }
      } else {
        char.userData.pullExertion *= 0.92;
        char.userData.stumble *= 0.90;

        // Team B leans in opposite direction
        const baseLean = 0.35 + (char.userData.pullExertion * 0.35) - (char.userData.stumble * 0.4);
        char.rotation.z = baseLean;

        const breathe = Math.sin(time * 3 + idx * 0.5) * 0.03;
        char.position.y = breathe;

        char.userData.leftArmGroup.rotation.x = -0.9 + Math.sin(time * 6) * 0.05;
        char.userData.rightArmGroup.rotation.x = -0.7 - Math.sin(time * 6) * 0.05;

        char.userData.leftLegGroup.rotation.x = 0.4;
        char.userData.rightLegGroup.rotation.x = -0.3;
      }
    });

    // 5. Update Particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.position.x += p.userData.vx;
      p.position.y += p.userData.vy;
      p.position.z += p.userData.vz;
      p.userData.vy -= 0.002; // gravity
      p.userData.life--;
      if (p.userData.life <= 0) {
        this.scene.remove(p);
        this.particles.splice(i, 1);
      }
    }

    // 6. Camera shake
    if (this.cameraShake > 0) {
      this.camera.position.x = (Math.random() - 0.5) * this.cameraShake;
      this.camera.position.y = 7.5 + (Math.random() - 0.5) * this.cameraShake;
      this.cameraShake *= 0.88;
      if (this.cameraShake < 0.01) {
        this.cameraShake = 0;
        this.camera.position.set(0, 7.5, 17.5);
      }
    }

    // 7. Victory fireworks periodic trigger
    if (this.isVictory && Math.random() < 0.06) {
      this.spawnFirework();
      if (typeof sound !== 'undefined') {
        sound.playFirework();
      }
    }

    this.renderer.render(this.scene, this.camera);
  }

  animateFallback(delta) {
    if (!this.isPaused) {
      this.animationTime += delta;
      const time = this.animationTime;
      this.ropeOffset += (this.targetRopeOffset - this.ropeOffset) * Math.min(1, delta * 8);
      this.fallbackClouds.forEach(cloud => {
        cloud.x += cloud.speed * delta;
        if (cloud.x > this.container.clientWidth + 100) cloud.x = -220;
      });
      this.fallbackParticles = this.fallbackParticles.filter(particle => {
        particle.x += particle.vx * delta;
        particle.y += particle.vy * delta;
        particle.vy += 80 * delta;
        particle.life -= delta;
        return particle.life > 0;
      });
      if (this.isVictory && this.winningTeam !== null && Math.random() < delta * 1.5) {
        this.spawnFirework();
        if (typeof sound !== 'undefined') sound.playFirework();
      }
      this.teamACharacters.concat(this.teamBCharacters).forEach(character => {
        character.userData.pullExertion *= Math.pow(0.08, delta);
        character.userData.stumble *= Math.pow(0.08, delta);
      });
    }
    this.drawFallbackArena();
  }

  drawFallbackArena() {
    const ctx = this.fallbackContext;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    if (!ctx || !width || !height) return;

    const sky = ctx.createLinearGradient(0, 0, 0, height);
    sky.addColorStop(0, '#71b8f5');
    sky.addColorStop(0.65, '#c8e6ff');
    sky.addColorStop(1, '#f3d889');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, width, height);

    const characterScale = Math.max(24, Math.min(48, Math.min(width / 28, height / 10)));
    const sunX = width * 0.83;
    const sunY = height * 0.13;

    const sunGlow = ctx.createRadialGradient(sunX, sunY, 4, sunX, sunY, 78);
    sunGlow.addColorStop(0, 'rgba(255,246,184,0.62)');
    sunGlow.addColorStop(1, 'rgba(255,246,184,0)');
    ctx.fillStyle = sunGlow;
    ctx.fillRect(sunX - 90, sunY - 90, 180, 180);
    this.drawVoxelBlock(ctx, sunX - 24, sunY - 24, 48, 48, 9, '#fff4a8', '#f7cf50', '#dfa92c');

    this.drawFallbackMountains(ctx, width, height);

    this.fallbackClouds.forEach((cloud, index) => {
      const x = cloud.x % (width + 260) - 80;
      this.drawFallbackCloud(ctx, x, cloud.y, 0.78 + (index % 3) * 0.14);
    });

    this.drawFallbackHills(ctx, width, height);

    const groundY = height * 0.53;
    this.drawFallbackTrees(ctx, width, groundY);
    this.drawFallbackGrass(ctx, width, groundY);

    const trackY = groundY - 30;
    this.drawFallbackTrack(ctx, width, trackY);
    this.drawFallbackFences(ctx, width, trackY);
    this.drawFallbackSpectators(ctx, width, trackY);

    const centerX = width / 2 + this.ropeOffset * width / 26;
    const ropeY = trackY - 42;
    this.drawFallbackRope(ctx, width, ropeY, centerX);

    this.teamACharacters.concat(this.teamBCharacters).forEach(character => {
      const team = character.userData.team;
      const direction = team === 'A' ? 1 : -1;
      const screenX = width / 2 + (character.userData.baseX + this.ropeOffset) * width / 26;
      const hop = this.isVictory && this.winningTeam === team
        ? Math.abs(Math.sin(this.animationTime * 7 + character.userData.phase)) * characterScale * 0.45
        : Math.sin(this.animationTime * 3 + character.userData.phase) * characterScale * 0.035;
      const baseY = trackY + 3 - hop;
      const exertion = character.userData.pullExertion;
      const stumble = character.userData.stumble;
      const lean = (team === 'A' ? -1 : 1) * (0.09 + exertion * 0.2 - stumble * 0.08);
      this.drawFallbackCharacter(
        ctx, screenX, baseY, characterScale, direction, lean,
        character.userData.palette, team, exertion, stumble, character.userData.phase
      );
    });

    this.fallbackParticles.forEach(particle => {
      ctx.fillStyle = particle.color || `rgba(128,91,56,${Math.max(0, particle.life)})`;
      const particleSize = particle.color ? 7 : Math.max(3, characterScale * 0.12);
      ctx.fillRect(particle.x, particle.y, particleSize, particleSize);
    });
  }

  drawFallbackMountains(ctx, width, height) {
    const horizon = height * 0.39;
    const peaks = [
      [-0.08, 0.12, '#9ab7c9'], [0.1, 0.2, '#87a9bb'], [0.31, 0.13, '#a5bdc8'],
      [0.49, 0.21, '#89a9b9'], [0.69, 0.14, '#a3bac4'], [0.9, 0.2, '#8eacbb']
    ];
    peaks.forEach(([position, size, color]) => {
      const x = width * position;
      const peakWidth = width * 0.2;
      const peakHeight = height * size;
      ctx.beginPath();
      ctx.moveTo(x - peakWidth * 0.55, horizon);
      ctx.lineTo(x, horizon - peakHeight);
      ctx.lineTo(x + peakWidth * 0.55, horizon);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(x, horizon - peakHeight);
      ctx.lineTo(x + peakWidth * 0.55, horizon);
      ctx.lineTo(x + peakWidth * 0.1, horizon);
      ctx.closePath();
      ctx.fillStyle = 'rgba(62,96,111,0.22)';
      ctx.fill();

      ctx.fillStyle = 'rgba(244,249,249,0.9)';
      ctx.beginPath();
      ctx.moveTo(x - peakWidth * 0.13, horizon - peakHeight * 0.72);
      ctx.lineTo(x, horizon - peakHeight);
      ctx.lineTo(x + peakWidth * 0.16, horizon - peakHeight * 0.67);
      ctx.lineTo(x + peakWidth * 0.07, horizon - peakHeight * 0.73);
      ctx.lineTo(x, horizon - peakHeight * 0.57);
      ctx.closePath();
      ctx.fill();
    });
  }

  drawFallbackCloud(ctx, x, y, scale) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.fillStyle = 'rgba(78,117,157,0.16)';
    ctx.fillRect(8, 18, 108, 24);
    ctx.fillRect(30, 3, 54, 19);
    ctx.fillRect(77, 11, 58, 22);
    ctx.fillStyle = '#f4f8fa';
    ctx.fillRect(0, 12, 111, 27);
    ctx.fillRect(21, 0, 58, 22);
    ctx.fillRect(67, 7, 57, 23);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(7, 15, 93, 10);
    ctx.fillRect(30, 3, 44, 7);
    ctx.restore();
  }

  drawFallbackHills(ctx, width, height) {
    const horizon = height * 0.42;
    ctx.fillStyle = '#79ad68';
    ctx.beginPath();
    ctx.moveTo(0, horizon + 22);
    ctx.quadraticCurveTo(width * 0.22, horizon - 45, width * 0.44, horizon + 21);
    ctx.quadraticCurveTo(width * 0.74, horizon - 27, width, horizon + 9);
    ctx.lineTo(width, height * 0.6);
    ctx.lineTo(0, height * 0.6);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = 'rgba(221,235,169,0.32)';
    ctx.beginPath();
    ctx.moveTo(0, horizon + 30);
    ctx.quadraticCurveTo(width * 0.22, horizon - 20, width * 0.44, horizon + 25);
    ctx.quadraticCurveTo(width * 0.75, horizon - 2, width, horizon + 20);
    ctx.lineTo(width, horizon + 38);
    ctx.quadraticCurveTo(width * 0.66, horizon + 12, width * 0.43, horizon + 47);
    ctx.quadraticCurveTo(width * 0.18, horizon + 15, 0, horizon + 46);
    ctx.closePath();
    ctx.fill();
  }

  drawFallbackTrees(ctx, width, groundY) {
    const treeSpacing = Math.max(105, width / 7);
    for (let index = 0; index < 8; index++) {
      const x = (index * treeSpacing + 18) % (width + 80) - 30;
      const height = 52 + (index % 3) * 9;
      const trunkWidth = 12 + (index % 2) * 3;
      const crownWidth = 46 + (index % 3) * 8;
      const top = groundY - height - crownWidth * 0.6;

      ctx.fillStyle = 'rgba(39,65,34,0.2)';
      ctx.fillRect(x - 8, groundY - 3, crownWidth + 24, 5);
      this.drawVoxelBlock(ctx, x + crownWidth * 0.35, groundY - height, trunkWidth, height, 7, '#9b7044', '#74502f', '#573a25');
      this.drawVoxelBlock(ctx, x, top + 29, crownWidth, 31, 14, '#6db94a', '#3c8c38', '#286b31');
      this.drawVoxelBlock(ctx, x + 11, top + 9, crownWidth - 15, 31, 13, '#70bd4d', '#39863a', '#286b31');
      this.drawVoxelBlock(ctx, x + 21, top - 4, crownWidth - 33, 24, 9, '#7dc751', '#438e38', '#2f7131');

      ctx.fillStyle = '#8dd15a';
      ctx.fillRect(x + 9, top + 36, 9, 6);
      ctx.fillRect(x + crownWidth - 6, top + 17, 7, 7);
      ctx.fillStyle = 'rgba(25,75,34,0.42)';
      ctx.fillRect(x + 6, top + 55, 11, 7);
      ctx.fillRect(x + crownWidth - 11, top + 46, 9, 8);
    }
  }

  drawFallbackGrass(ctx, width, groundY) {
    const dirtGradient = ctx.createLinearGradient(0, groundY, 0, groundY + 100);
    dirtGradient.addColorStop(0, '#78ad3e');
    dirtGradient.addColorStop(0.12, '#65933c');
    dirtGradient.addColorStop(0.13, '#95683f');
    dirtGradient.addColorStop(1, '#68472e');
    ctx.fillStyle = dirtGradient;
    ctx.fillRect(0, groundY, width, Math.max(0, ctx.canvas.clientHeight - groundY));
    ctx.fillStyle = '#83c449';
    ctx.fillRect(0, groundY - 4, width, 12);
    ctx.fillStyle = '#548f35';
    ctx.fillRect(0, groundY + 7, width, 4);
    for (let x = 0; x < width; x += 33) {
      const variation = (x / 33) % 3;
      ctx.fillStyle = variation === 0 ? '#a4774c' : variation === 1 ? '#815b3b' : '#91683f';
      ctx.fillRect(x, groundY + 20 + variation * 3, 29, 23);
      ctx.fillStyle = 'rgba(220,171,108,0.25)';
      ctx.fillRect(x + 3, groundY + 22 + variation * 3, 13, 3);
      ctx.fillStyle = 'rgba(56,39,28,0.3)';
      ctx.fillRect(x + 21, groundY + 38 + variation * 3, 7, 3);
    }

    for (let x = 14; x < width; x += 48) {
      ctx.fillStyle = '#4c8736';
      ctx.fillRect(x, groundY - 8, 3, 8);
      ctx.fillRect(x + 6, groundY - 6, 2, 6);
      if (x % 4 === 2) {
        ctx.fillStyle = x % 3 === 2 ? '#edbd46' : '#dc6654';
        ctx.fillRect(x + 3, groundY - 13, 7, 6);
        ctx.fillStyle = '#ffedaa';
        ctx.fillRect(x + 5, groundY - 12, 2, 2);
      }
    }
  }

  drawFallbackTrack(ctx, width, trackY) {
    const gradient = ctx.createLinearGradient(0, trackY, 0, trackY + 46);
    gradient.addColorStop(0, '#92958c');
    gradient.addColorStop(1, '#555d5d');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, trackY, width, 46);
    for (let x = -24; x < width; x += 52) {
      const shift = Math.floor(x / 52) % 2 ? 24 : 0;
      this.drawVoxelBlock(ctx, x + shift, trackY + 1, 47, 21, 5, '#b5b4a9', '#84877f', '#666c6b');
      this.drawVoxelBlock(ctx, x - shift, trackY + 24, 47, 20, 4, '#a2a198', '#797c76', '#5e6361');
    }
  }

  drawFallbackFences(ctx, width, trackY) {
    const fenceY = trackY - 58;
    ctx.fillStyle = 'rgba(50,54,47,0.28)';
    ctx.fillRect(0, fenceY + 31, width, 8);
    ctx.fillStyle = '#744a2b';
    ctx.fillRect(0, fenceY + 11, width, 8);
    ctx.fillStyle = '#b07a45';
    ctx.fillRect(0, fenceY + 8, width, 6);
    ctx.fillStyle = '#8e6138';
    ctx.fillRect(0, fenceY + 31, width, 8);
    for (let x = 12; x < width; x += 64) {
      this.drawVoxelBlock(ctx, x, fenceY, 9, 44, 6, '#c18a50', '#87572f', '#684329');
      ctx.fillStyle = '#d5a364';
      ctx.fillRect(x + 2, fenceY + 4, 2, 33);
    }
  }

  drawFallbackSpectators(ctx, width, trackY) {
    const animals = [
      { x: width * 0.045, sheep: false },
      { x: width * 0.12, sheep: true },
      { x: width * 0.88, sheep: false },
      { x: width * 0.955, sheep: true }
    ];
    animals.forEach(({ x, sheep }, index) => {
      const y = trackY + 8;
      const body = sheep ? '#eeeade' : '#ee9b91';
      const shadow = sheep ? '#bcb9ad' : '#bd6961';
      const head = sheep ? '#ddd8cc' : '#e9a49a';
      ctx.fillStyle = 'rgba(34,46,37,0.24)';
      ctx.fillRect(x - 15, y + 21, 40, 5);
      this.drawVoxelBlock(ctx, x - 14, y + 1, 31, 17, 6, '#fffdf2', shadow, body);
      this.drawVoxelBlock(ctx, x + (index % 2 ? 10 : -3), y - 7, 16, 17, 5, head, shadow, head);
      for (let leg = 0; leg < 4; leg++) {
        const legX = x - 11 + (leg % 2) * 21;
        const legY = y + 14 + Math.floor(leg / 2) * 2;
        this.drawVoxelBlock(ctx, legX, legY, 5, 10, 2, '#e3c1a7', '#8a6755', '#735644');
      }
      if (!sheep) {
        ctx.fillStyle = '#bb554b';
        ctx.fillRect(x + (index % 2 ? 15 : 1), y - 1, 8, 4);
        ctx.fillStyle = '#49352f';
        ctx.fillRect(x + (index % 2 ? 20 : 2), y - 2, 2, 3);
      } else {
        ctx.fillStyle = '#252a25';
        ctx.fillRect(x + 5, y - 2, 3, 3);
      }
    });
  }

  drawFallbackRope(ctx, width, ropeY, centerX) {
    ctx.save();
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#6d482b';
    ctx.lineWidth = 12;
    ctx.beginPath();
    ctx.moveTo(width * 0.08, ropeY + 4);
    ctx.quadraticCurveTo(width * 0.5, ropeY + 8, width * 0.92, ropeY + 4);
    ctx.stroke();
    ctx.strokeStyle = '#c49a62';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(width * 0.08, ropeY + 2);
    ctx.quadraticCurveTo(width * 0.5, ropeY + 6, width * 0.92, ropeY + 2);
    ctx.stroke();
    for (let x = width * 0.1; x < width * 0.9; x += 15) {
      ctx.strokeStyle = x % 30 < 15 ? '#714a2a' : '#e1bc7e';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x, ropeY - 1);
      ctx.lineTo(x + 8, ropeY + 7);
      ctx.stroke();
    }
    ctx.restore();

    this.drawVoxelBlock(ctx, centerX - 7, ropeY - 11, 13, 28, 5, '#ff7970', '#dc3e37', '#aa292b');
    ctx.fillStyle = 'rgba(255,239,194,0.88)';
    ctx.fillRect(centerX - 3, ropeY - 7, 2, 16);
  }

  drawVoxelBlock(ctx, x, y, width, height, depth, top, side, front) {
    ctx.fillStyle = side;
    ctx.beginPath();
    ctx.moveTo(x + width, y);
    ctx.lineTo(x + width + depth, y - depth * 0.55);
    ctx.lineTo(x + width + depth, y + height - depth * 0.55);
    ctx.lineTo(x + width, y + height);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = front;
    ctx.fillRect(x, y, width, height);
    ctx.fillStyle = top;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + depth, y - depth * 0.55);
    ctx.lineTo(x + width + depth, y - depth * 0.55);
    ctx.lineTo(x + width, y);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = 'rgba(255,255,255,0.16)';
    ctx.fillRect(x + 2, y + 2, Math.max(0, width - 5), Math.max(1, height * 0.12));
    ctx.fillStyle = 'rgba(27,37,29,0.15)';
    ctx.fillRect(x + width - 3, y + 2, 3, Math.max(0, height - 4));
  }

  drawFallbackCharacter(ctx, x, groundY, size, facing, lean, palette, team, exertion, stumble, phase) {
    ctx.save();
    ctx.translate(x, groundY);
    ctx.rotate(lean * facing);
    const bob = Math.sin(this.animationTime * 5 + phase) * size * 0.035;
    const head = size * 0.82;
    const bodyW = size * 0.8;
    const bodyTop = -size * 1.5 + bob;
    const skin = team === 'A' ? '#c99a72' : '#ebc5a1';
    const pants = team === 'A' ? '#354d87' : '#65452f';
    const boots = team === 'A' ? '#47372d' : '#3d3a39';
    const armor = palette.armor;

    const shadow = ctx.createRadialGradient(0, -2, 2, 0, -2, size * 0.9);
    shadow.addColorStop(0, 'rgba(24,34,25,0.36)');
    shadow.addColorStop(1, 'rgba(24,34,25,0)');
    ctx.fillStyle = shadow;
    ctx.fillRect(-size, -size * 0.15, size * 2, size * 0.35);

    const legSwing = this.isVictory && this.winningTeam === team
      ? -Math.abs(Math.sin(this.animationTime * 8 + phase)) * 0.35
      : Math.sin(this.animationTime * 7 + phase) * exertion * 0.18;
    const drawLeg = (legX, swing) => {
      ctx.save();
      ctx.translate(legX, -size * 0.49 + bob);
      ctx.rotate(swing * facing);
      this.drawVoxelBlock(ctx, -size * 0.16, -size * 0.52, size * 0.32, size * 0.48, size * 0.09, '#647db0', pants, '#273c72');
      this.drawVoxelBlock(ctx, -size * 0.2, -size * 0.12, size * 0.39, size * 0.14, size * 0.1, '#756252', boots, '#352b26');
      ctx.restore();
    };
    drawLeg(-size * 0.19, legSwing);
    drawLeg(size * 0.19, -legSwing);

    this.drawVoxelBlock(ctx, -bodyW * 0.55, bodyTop, bodyW * 1.1, size * 0.83, size * 0.17,
      armor || palette.shirt, palette.side || '#137675', palette.front || palette.shirt);
    ctx.fillStyle = armor ? '#173d4b' : '#473a28';
    ctx.fillRect(-bodyW * 0.55, bodyTop + size * 0.67, bodyW * 1.1, size * 0.12);
    ctx.fillStyle = '#e4c266';
    ctx.fillRect(-size * 0.05, bodyTop + size * 0.66, size * 0.11, size * 0.13);

    const armReach = size * (0.48 + exertion * 0.15);
    const armLift = Math.sin(this.animationTime * 8 + phase) * size * 0.04;
    ctx.save();
    ctx.translate(-facing * bodyW * 0.46, bodyTop + size * 0.08 + armLift);
    ctx.rotate(facing * (0.48 - exertion * 0.18 + stumble * 0.14));
    this.drawVoxelBlock(ctx, -size * 0.14, 0, size * 0.29, armReach, size * 0.08,
      palette.sleeve || palette.shirt, palette.side || '#176d6a', palette.shirt);
    this.drawVoxelBlock(ctx, -size * 0.13, armReach - size * 0.03, size * 0.27, size * 0.23, size * 0.08,
      '#e5b891', '#b57e5c', skin);
    ctx.restore();
    ctx.save();
    ctx.translate(facing * bodyW * 0.43, bodyTop + size * 0.08 - armLift);
    ctx.rotate(-facing * (0.78 - exertion * 0.35));
    this.drawVoxelBlock(ctx, -size * 0.14, 0, size * 0.29, armReach * 0.9, size * 0.08,
      palette.sleeve || palette.shirt, palette.side || '#176d6a', palette.shirt);
    this.drawVoxelBlock(ctx, -size * 0.13, armReach * 0.9 - size * 0.03, size * 0.27, size * 0.23, size * 0.08,
      '#e5b891', '#b57e5c', skin);
    ctx.restore();

    if (armor) {
      ctx.fillStyle = palette.highlight;
      ctx.fillRect(-bodyW * 0.32, bodyTop + size * 0.14, bodyW * 0.64, size * 0.12);
      ctx.fillStyle = palette.shadow;
      ctx.fillRect(-bodyW * 0.44, bodyTop + size * 0.48, bodyW * 0.88, size * 0.1);
      ctx.fillStyle = palette.highlight;
      ctx.fillRect(-bodyW * 0.58, bodyTop + size * 0.02, size * 0.18, size * 0.18);
      ctx.fillRect(bodyW * 0.4, bodyTop + size * 0.02, size * 0.18, size * 0.18);
    }

    const headX = -head * 0.48;
    const headY = bodyTop - head * 0.92;
    this.drawVoxelBlock(ctx, headX, headY, head, head, size * 0.16, palette.hair, '#805133', skin);
    ctx.fillStyle = palette.hair;
    ctx.fillRect(headX, headY, head, size * 0.2);
    ctx.fillRect(headX, headY + size * 0.13, size * 0.13, size * 0.25);
    ctx.fillRect(headX + head - size * 0.12, headY + size * 0.13, size * 0.12, size * 0.25);

    const eyeY = headY + head * 0.46;
    const eyeX = facing > 0 ? headX + head * 0.53 : headX + head * 0.16;
    ctx.fillStyle = '#f5f2df';
    ctx.fillRect(eyeX, eyeY, size * 0.14, size * 0.105);
    ctx.fillStyle = team === 'A' ? '#4274a8' : '#56853d';
    ctx.fillRect(eyeX + (facing > 0 ? size * 0.075 : 0), eyeY, size * 0.065, size * 0.105);
    ctx.fillStyle = '#33261d';
    ctx.fillRect(headX + head * 0.42, headY + head * 0.68, head * 0.18, size * 0.055);
    ctx.fillStyle = '#e0ad84';
    ctx.fillRect(headX + head * 0.45, headY + head * 0.55, size * 0.1, size * 0.1);

    if (armor) {
      ctx.fillStyle = palette.highlight;
      ctx.fillRect(headX - size * 0.04, headY - size * 0.05, head + size * 0.08, size * 0.14);
      ctx.fillRect(headX - size * 0.03, headY + size * 0.08, size * 0.12, size * 0.18);
      ctx.fillRect(headX + head - size * 0.08, headY + size * 0.08, size * 0.11, size * 0.18);
      ctx.fillStyle = palette.shadow;
      ctx.fillRect(headX, headY + size * 0.12, head, size * 0.06);
    }

    ctx.fillStyle = 'rgba(255,255,255,0.18)';
    ctx.fillRect(headX + size * 0.07, headY + size * 0.26, size * 0.08, size * 0.09);
    ctx.restore();
  }
}
