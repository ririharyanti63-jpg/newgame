/**
 * MINECRAFT PROCEDURAL TEXTURE GENERATOR
 * Generates 16x16 and 32x32 pixel-art textures using Canvas API,
 * providing authentic, razor-sharp Minecraft block and character textures.
 */

class MinecraftTextureGenerator {
  constructor() {
    this.cache = {};
  }

  createCanvas(width, height) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    return { canvas, ctx };
  }

  toThreeTexture(canvas) {
    const texture = new THREE.CanvasTexture(canvas);
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    texture.generateMipmaps = false;
    return texture;
  }

  // --- BLOCKS TEXTURES ---

  getGrassTop() {
    if (this.cache['grass_top']) return this.cache['grass_top'];
    const { canvas, ctx } = this.createCanvas(16, 16);
    const colors = ['#589b33', '#4c8a2b', '#62ab38', '#3e7323', '#52912e'];
    for (let x = 0; x < 16; x++) {
      for (let y = 0; y < 16; y++) {
        const c = colors[Math.floor(Math.random() * colors.length)];
        ctx.fillStyle = c;
        ctx.fillRect(x, y, 1, 1);
      }
    }
    const tex = this.toThreeTexture(canvas);
    this.cache['grass_top'] = tex;
    return tex;
  }

  getDirt() {
    if (this.cache['dirt']) return this.cache['dirt'];
    const { canvas, ctx } = this.createCanvas(16, 16);
    const colors = ['#866043', '#725036', '#5c3f29', '#6e4c33', '#966d4e'];
    for (let x = 0; x < 16; x++) {
      for (let y = 0; y < 16; y++) {
        const c = colors[Math.floor(Math.random() * colors.length)];
        ctx.fillStyle = c;
        ctx.fillRect(x, y, 1, 1);
      }
    }
    const tex = this.toThreeTexture(canvas);
    this.cache['dirt'] = tex;
    return tex;
  }

  getGrassSide() {
    if (this.cache['grass_side']) return this.cache['grass_side'];
    const { canvas, ctx } = this.createCanvas(16, 16);
    // Fill base with dirt
    const dirtColors = ['#866043', '#725036', '#5c3f29', '#6e4c33'];
    for (let x = 0; x < 16; x++) {
      for (let y = 0; y < 16; y++) {
        ctx.fillStyle = dirtColors[Math.floor(Math.random() * dirtColors.length)];
        ctx.fillRect(x, y, 1, 1);
      }
    }
    // Grass overhang at top 3-5 pixels
    const grassColors = ['#589b33', '#4c8a2b', '#62ab38', '#3e7323'];
    for (let x = 0; x < 16; x++) {
      const drop = (x % 3 === 0) ? 4 : (x % 2 === 0 ? 3 : 2);
      for (let y = 0; y < drop; y++) {
        ctx.fillStyle = grassColors[Math.floor(Math.random() * grassColors.length)];
        ctx.fillRect(x, y, 1, 1);
      }
    }
    const tex = this.toThreeTexture(canvas);
    this.cache['grass_side'] = tex;
    return tex;
  }

  getStone() {
    if (this.cache['stone']) return this.cache['stone'];
    const { canvas, ctx } = this.createCanvas(16, 16);
    const colors = ['#777777', '#666666', '#858585', '#555555', '#909090'];
    for (let x = 0; x < 16; x++) {
      for (let y = 0; y < 16; y++) {
        ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
        ctx.fillRect(x, y, 1, 1);
      }
    }
    const tex = this.toThreeTexture(canvas);
    this.cache['stone'] = tex;
    return tex;
  }

  getCobblestone() {
    if (this.cache['cobblestone']) return this.cache['cobblestone'];
    const { canvas, ctx } = this.createCanvas(16, 16);
    const colors = ['#5a5a5a', '#6d6d6d', '#828282', '#4b4b4b', '#3d3d3d'];
    for (let x = 0; x < 16; x++) {
      for (let y = 0; y < 16; y++) {
        ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
        ctx.fillRect(x, y, 1, 1);
      }
    }
    // Pixel borders to resemble cobblestone chunks
    ctx.fillStyle = '#333333';
    ctx.fillRect(0, 0, 16, 1);
    ctx.fillRect(0, 8, 16, 1);
    ctx.fillRect(8, 0, 1, 8);
    ctx.fillRect(4, 8, 1, 8);
    ctx.fillRect(12, 8, 1, 8);

    const tex = this.toThreeTexture(canvas);
    this.cache['cobblestone'] = tex;
    return tex;
  }

  getOakLogSide() {
    if (this.cache['oak_log_side']) return this.cache['oak_log_side'];
    const { canvas, ctx } = this.createCanvas(16, 16);
    const barks = ['#674d29', '#574122', '#4a371c', '#795b32'];
    for (let x = 0; x < 16; x++) {
      for (let y = 0; y < 16; y++) {
        const stripe = (x % 4 === 0) ? '#4a371c' : barks[Math.floor(Math.random() * barks.length)];
        ctx.fillStyle = stripe;
        ctx.fillRect(x, y, 1, 1);
      }
    }
    const tex = this.toThreeTexture(canvas);
    this.cache['oak_log_side'] = tex;
    return tex;
  }

  getOakLeaves() {
    if (this.cache['oak_leaves']) return this.cache['oak_leaves'];
    const { canvas, ctx } = this.createCanvas(16, 16);
    const colors = ['#387324', '#2d5e1d', '#48932e', '#234a16'];
    for (let x = 0; x < 16; x++) {
      for (let y = 0; y < 16; y++) {
        if (Math.random() > 0.08) {
          ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
          ctx.fillRect(x, y, 1, 1);
        } else {
          // slight transparency speck for authentic leaf canopy
          ctx.fillStyle = '#224014';
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }
    const tex = this.toThreeTexture(canvas);
    this.cache['oak_leaves'] = tex;
    return tex;
  }

  getRope() {
    if (this.cache['rope']) return this.cache['rope'];
    const { canvas, ctx } = this.createCanvas(16, 16);
    const shades = ['#b8905b', '#a47e4c', '#8e6b3c', '#cca46b', '#73542d'];
    for (let x = 0; x < 16; x++) {
      for (let y = 0; y < 16; y++) {
        // Spiral twist pattern
        const twist = (x + y) % 4;
        ctx.fillStyle = (twist === 0) ? '#73542d' : shades[Math.floor(Math.random() * shades.length)];
        ctx.fillRect(x, y, 1, 1);
      }
    }
    const tex = this.toThreeTexture(canvas);
    this.cache['rope'] = tex;
    return tex;
  }

  getWool(colorHex) {
    const key = 'wool_' + colorHex;
    if (this.cache[key]) return this.cache[key];
    const { canvas, ctx } = this.createCanvas(16, 16);
    ctx.fillStyle = colorHex;
    ctx.fillRect(0, 0, 16, 16);
    for (let i = 0; i < 40; i++) {
      ctx.fillStyle = 'rgba(255,255,255,0.12)';
      ctx.fillRect(Math.floor(Math.random()*16), Math.floor(Math.random()*16), 1, 1);
      ctx.fillStyle = 'rgba(0,0,0,0.12)';
      ctx.fillRect(Math.floor(Math.random()*16), Math.floor(Math.random()*16), 1, 1);
    }
    const tex = this.toThreeTexture(canvas);
    this.cache[key] = tex;
    return tex;
  }

  // --- CHARACTER SKINS ---

  getSteveFace() {
    if (this.cache['steve_face']) return this.cache['steve_face'];
    const { canvas, ctx } = this.createCanvas(16, 16);
    // Skin tone
    ctx.fillStyle = '#bc8b68';
    ctx.fillRect(0, 0, 16, 16);

    // Hair
    ctx.fillStyle = '#4a3219';
    ctx.fillRect(0, 0, 16, 5);
    ctx.fillRect(0, 5, 2, 4);
    ctx.fillRect(14, 5, 2, 4);

    // Eyes
    // White
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(2, 7, 3, 2);
    ctx.fillRect(11, 7, 3, 2);
    // Blue pupil
    ctx.fillStyle = '#2c478a';
    ctx.fillRect(3, 7, 2, 2);
    ctx.fillRect(11, 7, 2, 2);

    // Nose
    ctx.fillStyle = '#9e6e4f';
    ctx.fillRect(7, 9, 2, 1);

    // Mouth / Beard
    ctx.fillStyle = '#5c3a21';
    ctx.fillRect(5, 11, 6, 2);
    ctx.fillRect(6, 13, 4, 1);

    const tex = this.toThreeTexture(canvas);
    this.cache['steve_face'] = tex;
    return tex;
  }

  getSteveBody() {
    if (this.cache['steve_body']) return this.cache['steve_body'];
    const { canvas, ctx } = this.createCanvas(16, 16);
    // Cyan shirt
    ctx.fillStyle = '#00a8aa';
    ctx.fillRect(0, 0, 16, 16);
    // Neck skin
    ctx.fillStyle = '#bc8b68';
    ctx.fillRect(6, 0, 4, 3);
    // Shirt folds & shading
    ctx.fillStyle = '#008789';
    ctx.fillRect(0, 14, 16, 2);
    ctx.fillRect(3, 8, 2, 4);
    ctx.fillRect(11, 8, 2, 4);

    const tex = this.toThreeTexture(canvas);
    this.cache['steve_body'] = tex;
    return tex;
  }

  getSteveArm() {
    if (this.cache['steve_arm']) return this.cache['steve_arm'];
    const { canvas, ctx } = this.createCanvas(16, 16);
    // Sleeve (top 4 px)
    ctx.fillStyle = '#00a8aa';
    ctx.fillRect(0, 0, 16, 5);
    // Skin (rest of arm)
    ctx.fillStyle = '#bc8b68';
    ctx.fillRect(0, 5, 16, 11);
    // Muscle shading
    ctx.fillStyle = '#9e6e4f';
    ctx.fillRect(0, 14, 16, 2);

    const tex = this.toThreeTexture(canvas);
    this.cache['steve_arm'] = tex;
    return tex;
  }

  getSteveLeg() {
    if (this.cache['steve_leg']) return this.cache['steve_leg'];
    const { canvas, ctx } = this.createCanvas(16, 16);
    // Blue jeans
    ctx.fillStyle = '#2c3e86';
    ctx.fillRect(0, 0, 16, 13);
    ctx.fillStyle = '#223068';
    ctx.fillRect(0, 6, 16, 2);
    // Dark shoes
    ctx.fillStyle = '#555555';
    ctx.fillRect(0, 13, 16, 3);
    ctx.fillStyle = '#3a3a3a';
    ctx.fillRect(0, 15, 16, 1);

    const tex = this.toThreeTexture(canvas);
    this.cache['steve_leg'] = tex;
    return tex;
  }

  // Alex Skins
  getAlexFace() {
    if (this.cache['alex_face']) return this.cache['alex_face'];
    const { canvas, ctx } = this.createCanvas(16, 16);
    // Fair skin
    ctx.fillStyle = '#f2cead';
    ctx.fillRect(0, 0, 16, 16);

    // Orange ginger hair
    ctx.fillStyle = '#b35222';
    ctx.fillRect(0, 0, 16, 6);
    ctx.fillRect(0, 6, 3, 5);
    ctx.fillRect(13, 6, 3, 5);

    // Green eyes
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(3, 7, 3, 2);
    ctx.fillRect(10, 7, 3, 2);
    ctx.fillStyle = '#429342';
    ctx.fillRect(4, 7, 2, 2);
    ctx.fillRect(10, 7, 2, 2);

    // Lips
    ctx.fillStyle = '#d27c62';
    ctx.fillRect(6, 11, 4, 1);

    const tex = this.toThreeTexture(canvas);
    this.cache['alex_face'] = tex;
    return tex;
  }

  getAlexBody() {
    if (this.cache['alex_body']) return this.cache['alex_body'];
    const { canvas, ctx } = this.createCanvas(16, 16);
    // Olive green tunic
    ctx.fillStyle = '#5c7841';
    ctx.fillRect(0, 0, 16, 16);
    // Neck fair skin
    ctx.fillStyle = '#f2cead';
    ctx.fillRect(6, 0, 4, 3);
    // Brown belt
    ctx.fillStyle = '#432918';
    ctx.fillRect(0, 13, 16, 3);
    ctx.fillStyle = '#c79c3b';
    ctx.fillRect(7, 13, 2, 3);

    const tex = this.toThreeTexture(canvas);
    this.cache['alex_body'] = tex;
    return tex;
  }

  getAlexArm() {
    if (this.cache['alex_arm']) return this.cache['alex_arm'];
    const { canvas, ctx } = this.createCanvas(16, 16);
    ctx.fillStyle = '#5c7841';
    ctx.fillRect(0, 0, 16, 5);
    ctx.fillStyle = '#f2cead';
    ctx.fillRect(0, 5, 16, 11);
    const tex = this.toThreeTexture(canvas);
    this.cache['alex_arm'] = tex;
    return tex;
  }

  getAlexLeg() {
    if (this.cache['alex_leg']) return this.cache['alex_leg'];
    const { canvas, ctx } = this.createCanvas(16, 16);
    // Brown trousers
    ctx.fillStyle = '#5a3d28';
    ctx.fillRect(0, 0, 16, 12);
    // Gray boots
    ctx.fillStyle = '#3f3f3f';
    ctx.fillRect(0, 12, 16, 4);

    const tex = this.toThreeTexture(canvas);
    this.cache['alex_leg'] = tex;
    return tex;
  }

  // Armor Variants
  getDiamondArmor() {
    if (this.cache['diamond_armor']) return this.cache['diamond_armor'];
    const { canvas, ctx } = this.createCanvas(16, 16);
    const dColors = ['#4eeddc', '#35c4b5', '#6efff0', '#20968b'];
    for (let x = 0; x < 16; x++) {
      for (let y = 0; y < 16; y++) {
        ctx.fillStyle = dColors[Math.floor(Math.random() * dColors.length)];
        ctx.fillRect(x, y, 1, 1);
      }
    }
    const tex = this.toThreeTexture(canvas);
    this.cache['diamond_armor'] = tex;
    return tex;
  }

  getGoldArmor() {
    if (this.cache['gold_armor']) return this.cache['gold_armor'];
    const { canvas, ctx } = this.createCanvas(16, 16);
    const gColors = ['#e6c82b', '#caa817', '#ffea6c', '#a8880c'];
    for (let x = 0; x < 16; x++) {
      for (let y = 0; y < 16; y++) {
        ctx.fillStyle = gColors[Math.floor(Math.random() * gColors.length)];
        ctx.fillRect(x, y, 1, 1);
      }
    }
    const tex = this.toThreeTexture(canvas);
    this.cache['gold_armor'] = tex;
    return tex;
  }

  getIronArmor() {
    if (this.cache['iron_armor']) return this.cache['iron_armor'];
    const { canvas, ctx } = this.createCanvas(16, 16);
    const iColors = ['#d8d8d8', '#bcbcbc', '#ececec', '#9c9c9c'];
    for (let x = 0; x < 16; x++) {
      for (let y = 0; y < 16; y++) {
        ctx.fillStyle = iColors[Math.floor(Math.random() * iColors.length)];
        ctx.fillRect(x, y, 1, 1);
      }
    }
    const tex = this.toThreeTexture(canvas);
    this.cache['iron_armor'] = tex;
    return tex;
  }

  // Spectator Animal Textures (Pig & Sheep)
  getPigTexture() {
    if (this.cache['pig']) return this.cache['pig'];
    const { canvas, ctx } = this.createCanvas(16, 16);
    ctx.fillStyle = '#f0a19b';
    ctx.fillRect(0, 0, 16, 16);
    // Pig snout
    ctx.fillStyle = '#db7e78';
    ctx.fillRect(5, 7, 6, 4);
    ctx.fillStyle = '#7a312d';
    ctx.fillRect(6, 8, 1, 2);
    ctx.fillRect(9, 8, 1, 2);
    // Eyes
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(2, 5, 2, 2);
    ctx.fillRect(12, 5, 2, 2);
    ctx.fillStyle = '#000000';
    ctx.fillRect(3, 5, 1, 2);
    ctx.fillRect(12, 5, 1, 2);
    const tex = this.toThreeTexture(canvas);
    this.cache['pig'] = tex;
    return tex;
  }

  getSheepTexture() {
    if (this.cache['sheep']) return this.cache['sheep'];
    const { canvas, ctx } = this.createCanvas(16, 16);
    ctx.fillStyle = '#ecebe4';
    ctx.fillRect(0, 0, 16, 16);
    // Soft fleece texture
    for (let i = 0; i < 30; i++) {
      ctx.fillStyle = '#dad7cc';
      ctx.fillRect(Math.floor(Math.random()*16), Math.floor(Math.random()*16), 1, 1);
    }
    const tex = this.toThreeTexture(canvas);
    this.cache['sheep'] = tex;
    return tex;
  }
}

// Global Texture Generator Instance
const mcTextures = new MinecraftTextureGenerator();
