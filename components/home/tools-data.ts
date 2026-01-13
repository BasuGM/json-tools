import {
  MdOutlineFormatAlignLeft,
  MdOutlineCheckCircle,
  MdCompareArrows,
  MdCleaningServices,
  MdOutlineAnalytics,
  MdOutlineVisibility,
  MdCode,
} from "react-icons/md";
import { AiOutlineSwap } from "react-icons/ai";
import { Tool } from "./tool-card";

/**
 * tools - Array of all available JSON tools
 * 
 * Each tool includes:
 * - title: Display name of the tool
 * - description: Brief explanation of functionality
 * - icon: React icon component
 * - href: Route path to the tool
 * - color: Tailwind color class for icon styling
 */
export const tools: Tool[] = [
  {
    title: "JSON Formatter / Beautifier",
    description: "Format and beautify your JSON with proper indentation",
    icon: MdOutlineFormatAlignLeft,
    href: "/formatter",
    color: "text-blue-500",
  },
  {
    title: "JSON Validator",
    description: "Validate your JSON syntax and structure",
    icon: MdOutlineCheckCircle,
    href: "/validator",
    color: "text-green-500",
  },
  {
    title: "JSON Diff Tool",
    description: "Compare two JSON objects and find differences",
    icon: MdCompareArrows,
    href: "/diff",
    color: "text-orange-500",
  },
  {
    title: "JSON Visualizer",
    description: "Visualize JSON data in a tree structure",
    icon: MdOutlineVisibility,
    href: "/visualizer",
    color: "text-indigo-500",
  },
  {
    title: "JSON Size Analyzer",
    description: "Analyze and optimize JSON file size",
    icon: MdOutlineAnalytics,
    href: "/analyzer",
    color: "text-pink-500",
  },
  {
    title: "JSON Minifier",
    description: "Minify and compress JSON data",
    icon: AiOutlineSwap,
    href: "/minifier",
    color: "text-purple-500",
  },
  {
    title: "JSON Cleanup Tool",
    description: "Clean and optimize your JSON data",
    icon: MdCleaningServices,
    href: "/cleanup",
    color: "text-cyan-500",
  },
  {
    title: "JSON to XML",
    description: "Convert JSON data to XML format",
    icon: MdCode,
    href: "/json-to-xml",
    color: "text-amber-500",
  },
];
