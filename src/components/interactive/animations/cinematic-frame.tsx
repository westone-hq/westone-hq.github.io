import { motion } from 'framer-motion';

// 시네마틱 프레임 — 뷰포트 진입 시 scale 1.3→1, border 100px→20px 수축 애니메이션
const CinematicFrame = () => {
    return (
        <section className="bg-gray-100 py-32 md:py-56 px-4 md:px-12">
            <div className="max-w-7xl mx-auto flex flex-col items-center">

                <motion.div
                    className="relative w-full max-w-4xl bg-black shadow-2xl"
                    style={{ borderStyle: 'solid', borderColor: 'black' }}
                    initial={{ scale: 1.3, opacity: 0, borderWidth: "100px" }}
                    whileInView={{ scale: 1, opacity: 1, borderWidth: "20px" }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/* 내부 콘텐츠 영역 */}
                    <div className="bg-white w-full h-[600px] md:h-[800px] relative overflow-hidden p-4 md:p-8">
                        <motion.div
                            initial={{ scale: 1.2 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.4, ease: "easeOut" }}
                            className="w-full h-full overflow-hidden"
                        >
                            <img
                                src="https://picsum.photos/1200/1000?random=50"
                                alt="Process"
                                className="w-full h-full object-cover grayscale"
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="absolute bottom-16 left-0 right-0 text-center pointer-events-none"
                        >
                            <div className="bg-black/90 text-white p-8 max-w-lg mx-auto backdrop-blur-md">
                                <p className="serif text-xl md:text-2xl italic whitespace-pre-line">
                                    "개발만 해주는 게 아니라{"\n"}
                                    제품 방향까지 함께 고민해줬어요."
                                </p>
                                <p className="mt-4 text-sm text-gray-400 uppercase tracking-widest">정현우 - Product Lead</p>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default CinematicFrame;
