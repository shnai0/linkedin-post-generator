import Link from "next/link";

interface CustomButtonProps {
  currentTab: string | number;
}

const CustomButton = ({ currentTab }: CustomButtonProps) => {
  const buttons = [
    {
      link: "/",
      text: "Styles💃",
      tooltip: "Generate posts using styles from top LinkedIn creators.",
      tabName: "vibe",
    },
    {
      link: "/custom",
      text: "Custom 🏗️",
      tooltip: "Use your custom prompt to generate post",
      tabName: "custom",
    },
    {
      link: "/template",
      text: "Template 📋",
      tooltip: "Generate post based on example",
      tabName: "template",
    },
    {
      link: "/enhancer",
      text: "Enhancer 💫",
      tooltip: "Enchance your post, make it shorter, longer, correct gramamr",
      tabName: "enhancer",
    },
    {
      link: "/ideas",
      text: "Ideas💡",
      tooltip: "Generate ideas for your post",
      tabName: "ideas",
    },
  ];

  return (
    <>
      {buttons.map((button, index) => (
        <Link href={button.link} key={index}>
          <div className="relative group">
            <button
              className={`px-3 py-2 rounded-md text-xs font-medium ${
                currentTab === button.tabName
                  ? "bg-gray-300 text-black"
                  : "border border-gray-300 bg-white text-gray-700 shadow-sm hover:bg-gray-50"
              }`}
            >
              {button.text}
            </button>
            <span
              className="tooltip-text text-sm bg-gray-100 text-gray-700 p-1 rounded-md absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition duration-300"
              style={{ width: "150px" }}
            >
              {button.tooltip}
            </span>
          </div>
        </Link>
      ))}
    </>
  );
};

export default CustomButton;
