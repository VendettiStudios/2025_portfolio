export interface ProjectData {
  title: string;
  subtitle:string;
  description: string;
  imageSrc: string;
  link: string;
  about: string[]; // ✅ 'about' remains optional
  backgroundImage: string; // ✅ Store the actual image path
}