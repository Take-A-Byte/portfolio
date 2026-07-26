import gsap from "gsap";

// Ported from https://codepen.io/MarvinRudolph/pen/VNMXWO (Flower Loader)
const LEAF_SVG =
  '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 23.7 51.8" style="enable-background:new 0 0 23.7 51.8;" xml:space="preserve"><path d="M11.8,0c0,0-26.6,24.1,0,51.8C38.5,24.1,11.8,0,11.8,0z"/></svg>';

export class FlowerLoader {
  private element: HTMLElement;
  private flowerLeaves: HTMLElement;
  private numberOfLeaves = 7;
  private rotation: number;
  private path = [
    { x: 15, y: 0 },
    { x: 16, y: -1 },
    { x: 17, y: 0 },
    { x: 16, y: 1 },
    { x: 15, y: 0 },
  ];
  private location: { x: number; y: number };
  private timeline?: gsap.core.Timeline;

  constructor(element: HTMLElement) {
    this.element = element;
    this.flowerLeaves = element.querySelector(".flower__leaves") as HTMLElement;
    this.rotation = 360 / this.numberOfLeaves;
    this.location = { x: this.path[0].x, y: this.path[0].y };

    const tn1 = gsap.to(this.location, {
      duration: this.numberOfLeaves,
      bezier: { curviness: 1.5, values: this.path },
      ease: "none",
    });

    for (let i = 0; i < this.numberOfLeaves; i++) {
      const leafElement = document.createElement("div");
      leafElement.className = "flower__leaf";
      leafElement.innerHTML = `<div class="flower__leaf-inner">${LEAF_SVG}</div>`;
      tn1.time(i);

      gsap.set(leafElement, {
        x: this.location.x - 11,
        y: this.location.y - 37,
        rotation: this.rotation * i - 90,
      });

      this.flowerLeaves.appendChild(leafElement);
    }
    tn1.kill();

    this.animate();
  }

  private animate() {
    const leaves = this.flowerLeaves.querySelectorAll(".flower__leaf-inner");
    const center = this.element.querySelector(".flower__center");

    this.timeline = gsap.timeline({ repeat: -1 });

    this.timeline
      .fromTo(center, { scale: 0 }, { duration: 1, scale: 1, ease: "elastic.out(1.1, 0.75)" }, 0)
      .to(leaves, { duration: 1, scale: 1, ease: "elastic.out(1.1, 0.75)", stagger: 0.2 }, 0.3)
      .to(leaves, { duration: 0.3, scale: 1.25, ease: "elastic.out(1.5, 1)" })
      .to(this.flowerLeaves, { duration: 1.5, rotation: 360, ease: "expo.inOut" }, 1.7)
      .to(leaves, { duration: 0.5, scale: 0, ease: "elastic.inOut(1.1, 0.75)" })
      .to(center, { duration: 0.5, scale: 0, ease: "elastic.inOut(1.1, 0.75)" }, "-=0.37");
  }

  destroy() {
    this.timeline?.kill();
  }
}
