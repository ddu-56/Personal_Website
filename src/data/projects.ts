export type ProjectTag = "Object Detection" | "Segmentation" | "3D Vision";

export interface Project {
  title: string;
  description: string;
  tags: ProjectTag[];
  thumbnail: string;
  hoverImage?: string;
  repoUrl?: string;
  demoUrl?: string;
}

export const projects: Project[] = [
  {
    title: "Real-Time Object Detector",
    description:
      "A YOLOv8-based pipeline for real-time object detection on edge devices, achieving 45 FPS on NVIDIA Jetson Nano.",
    tags: ["Object Detection"],
    thumbnail: "/images/placeholder-detection.svg",
    hoverImage: "/images/placeholder-detection-hover.svg",
    repoUrl: "https://github.com",
  },
  {
    title: "Semantic Segmentation of Urban Scenes",
    description:
      "DeepLabV3+ trained on Cityscapes for pixel-level segmentation of streets, vehicles, and pedestrians with 78.2 mIoU.",
    tags: ["Segmentation"],
    thumbnail: "/images/placeholder-segmentation.svg",
    hoverImage: "/images/placeholder-segmentation-hover.svg",
    repoUrl: "https://github.com",
  },
  {
    title: "Monocular Depth Estimation",
    description:
      "Transformer-based monocular depth prediction from single RGB images, producing dense depth maps for indoor scenes.",
    tags: ["3D Vision"],
    thumbnail: "/images/placeholder-depth.svg",
    hoverImage: "/images/placeholder-depth-hover.svg",
    repoUrl: "https://github.com",
  },
  {
    title: "Instance Segmentation for Microscopy",
    description:
      "Mask R-CNN adapted for cell instance segmentation in biomedical microscopy images with 85% AP@50.",
    tags: ["Object Detection", "Segmentation"],
    thumbnail: "/images/placeholder-microscopy.svg",
    hoverImage: "/images/placeholder-microscopy-hover.svg",
    repoUrl: "https://github.com",
  },
  {
    title: "Stereo Vision Depth Mapping",
    description:
      "Classical and learned stereo matching for dense 3D reconstruction from calibrated stereo camera pairs.",
    tags: ["3D Vision"],
    thumbnail: "/images/placeholder-stereo.svg",
    hoverImage: "/images/placeholder-stereo-hover.svg",
    repoUrl: "https://github.com",
  },
  {
    title: "Panoptic Segmentation Pipeline",
    description:
      "Unified panoptic segmentation combining stuff and things classes for complete scene understanding.",
    tags: ["Segmentation", "Object Detection"],
    thumbnail: "/images/placeholder-panoptic.svg",
    hoverImage: "/images/placeholder-panoptic-hover.svg",
    repoUrl: "https://github.com",
  },
];
