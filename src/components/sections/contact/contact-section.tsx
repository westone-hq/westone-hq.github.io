import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import type { ContactFormData } from '../../../types';
import { TextInput, TextAreaInput, SelectInput } from "@/components/common/forms";

const ContactSection: React.FC = () => {
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        source: '',
        stage: '',
        message: '',
        newsletter: false,
    });

    const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const validate = () => {
        const newErrors: Partial<Record<keyof ContactFormData, string>> = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
        }
        if (!formData.message.trim()) newErrors.message = "Please tell us a bit about your project";
        if (!formData.stage) newErrors.stage = "Please select a stage";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));

        // Clear error when user types
        if (errors[name as keyof ContactFormData]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const getStageLabel = (value: string) => {
        const stage = stages.find(s => s.value === value);
        return stage ? stage.label : value;
    };

    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);

        // Build email content
        const subject = encodeURIComponent(`[문의] ${formData.name}님의 프로젝트 문의`);
        const body = encodeURIComponent(
`이름: ${formData.name}
이메일: ${formData.email}
어떻게 알게 되셨나요: ${formData.source || '미입력'}
프로젝트 단계: ${getStageLabel(formData.stage)}
뉴스레터 수신: ${formData.newsletter ? '동의' : '미동의'}

메시지:
${formData.message}`
        );

        // Open mailto link
        window.location.href = `mailto:westone251113@gmail.com?subject=${subject}&body=${body}`;

        setIsSubmitting(false);
        setIsSuccess(true);
        setFormData({
            name: '',
            email: '',
            source: '',
            stage: '',
            message: '',
            newsletter: false,
        });

        // Reset success message after a few seconds
        setTimeout(() => setIsSuccess(false), 5000);
    }, [formData]);

    const stages = [
        { value: 'idea', label: '아이디어 단계' },
        { value: 'prototype', label: '프로토타입 / MVP' },
        { value: 'scaling', label: '스케일업 단계' },
        { value: 'redesign', label: '리디자인 / 리빌드' },
    ];

    return (
        <motion.div
            className="absolute inset-0 z-40 w-full min-h-screen bg-neutral-950 flex items-start lg:items-center justify-center p-6 md:p-12 lg:p-24 overflow-y-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
        >

            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"></div>

            <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 relative z-10 pt-24 lg:pt-0">

                {/* Left Column: Text Content */}
                <div className="lg:col-span-5 flex flex-col justify-start pt-8">
                    <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl text-white mb-8 tracking-tight leading-[0.9]">
                        Let's <br />
                        <span className="italic">build.</span>
                    </h1>

                    <div className="space-y-6 text-neutral-400 text-lg md:text-xl font-light leading-relaxed whitespace-pre-line">
                        <p>
                            어디서부터 시작할지 고민이신가요?{"\n"}
                            복잡한 기술 과제를 우아하고 확장 가능한 {"\n"}
                            소프트웨어로 만드는 것이 우리의 전문 분야입니다.
                        </p>
                        <p>
                            제품 비전, 일정, 그리고 현재 어느 단계에 있는지 {"\n"}
                            알려주세요. 모든 프로젝트를 정성껏 다룹니다.
                        </p>
                    </div>

                    <div className="mt-12 pt-8 border-t border-neutral-800">
                        <p className="text-white font-medium mb-2">Direct Contact</p>
                        <a href="mailto:westone251113@gmail.com" className="text-neutral-500 hover:text-white transition-colors duration-300">
                            westone251113@gmail.com
                        </a>
                    </div>
                </div>

                {/* Right Column: Interactive Form */}
                <div className="lg:col-span-7 pb-12 lg:pb-0">
                    <div className="bg-transparent p-0 md:p-4">
                        <form onSubmit={handleSubmit} className="space-y-4">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                                <TextInput
                                    id="name"
                                    name="name"
                                    label="이름*"
                                    placeholder="Enter your name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    error={errors.name}
                                    disabled={isSubmitting}
                                />

                                <TextInput
                                    id="email"
                                    name="email"
                                    label="이메일*"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                                <TextInput
                                    id="source"
                                    name="source"
                                    label="어떻게 알게 되셨나요?"
                                    placeholder="LinkedIn, Recommendation, etc."
                                    value={formData.source}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                />

                                <SelectInput
                                    id="stage"
                                    name="stage"
                                    label="프로젝트 단계*"
                                    value={formData.stage}
                                    options={stages}
                                    onChange={handleChange}
                                    error={errors.stage}
                                    disabled={isSubmitting}
                                />
                            </div>

                            <TextAreaInput
                                id="message"
                                name="message"
                                label="메시지*"
                                placeholder="프로젝트 목표, 선호하는 기술 스택, 구체적인 과제 등을 알려주세요..."
                                value={formData.message}
                                onChange={handleChange}
                                error={errors.message}
                                disabled={isSubmitting}
                                rows={4}
                            />

                            <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            name="newsletter"
                                            checked={formData.newsletter}
                                            onChange={handleChange}
                                            className="peer sr-only"
                                            disabled={isSubmitting}
                                        />
                                        <div className="w-5 h-5 border border-neutral-600 rounded transition-colors peer-checked:bg-white peer-checked:border-white"></div>
                                        <svg className="absolute top-1 left-1 w-3 h-3 text-black opacity-0 peer-checked:opacity-100 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-neutral-500 group-hover:text-neutral-300 transition-colors select-none text-sm">
                                        기술 인사이트 업데이트 받기
                                    </span>
                                </label>

                                <button
                                    type="submit"
                                    disabled={isSubmitting || isSuccess}
                                    className={`
                    relative px-6 py-3 md:px-10 md:py-4 rounded-full font-medium text-sm tracking-wide transition-all duration-300
                    ${isSuccess
                                            ? 'bg-green-600 text-white cursor-default'
                                            : 'bg-white text-black hover:bg-neutral-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100'}
                  `}
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center gap-2">
                                            <svg className="animate-spin h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Sending...
                                        </span>
                                    ) : isSuccess ? (
                                        "Mail app opened"
                                    ) : (
                                        "Submit"
                                    )}
                                </button>

                            </div>

                            {isSuccess && (
                                <div className="mt-4 text-green-500 text-sm animate-pulse">
                                    메일 앱에서 전송 버튼을 눌러주세요. 24시간 내에 답변 드리겠습니다.
                                </div>
                            )}

                        </form>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ContactSection;
