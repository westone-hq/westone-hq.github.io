import { motion } from 'framer-motion';

const categories = [
    {
        title: "Design & UX Research",
        items: [
            "UX/UI Design",
            "Design Systems",
            "Brand",
            "UX Research & Testing",
            "Ideation & Prototyping"
        ]
    },
    {
        title: "Engineering",
        items: [
            "Full Stack Engineering",
            "Frontend Development",
            "Backend Development",
            "Mobile Development"
        ]
    },
    {
        title: "Product & Strategy",
        items: [
            "Product Management",
            "Product Strategy & Vision",
            "User Engagement & Retention"
        ]
    }
];

// 서비스 카테고리 — 3열 그리드, 각 항목 호버 시 점 인디케이터 + 텍스트 슬라이드
const ServiceCategories = () => {
    return (
        <section className="bg-black text-white py-20 md:py-32 px-6 md:px-20 border-t border-gray-900">
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24 xl:gap-32">
                {categories.map((category, idx) => (
                    <motion.div
                        key={idx}
                        className="flex flex-col"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: idx * 0.1 }}
                    >
                        {/* 장식선 */}
                        <div className="w-12 h-[2px] bg-white mb-10"></div>

                        <h3 className="text-3xl md:text-4xl font-normal mb-12 text-white leading-tight">
                            {category.title}
                        </h3>

                        <ul className="space-y-6">
                            {category.items.map((item, i) => (
                                <li key={i} className="group relative flex items-center cursor-default h-10" data-hover="true">
                                    {/* 호버 시 점 인디케이터 */}
                                    <span className="absolute left-0 w-2.5 h-2.5 bg-white rounded-full opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out origin-center"></span>
                                    {/* 호버 시 우측으로 슬라이드 */}
                                    <span className="text-xl md:text-2xl text-gray-400 group-hover:text-white transition-all duration-300 ease-out transform group-hover:translate-x-8">
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default ServiceCategories;
