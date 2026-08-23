import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import confetti from 'canvas-confetti';
import { contactFormSchema, ContactFormData } from '../types/portfolio';

// RATIONALE: Encapsulate all contact form validation, submission, and clipboard copying logic in a dedicated hook.
export const useContactForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      subject: '',
      serviceInterest: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    const recipient = 'fatimamagdy.8884@gmail.com';
    const emailSubject = encodeURIComponent(`[Portfolio Inquiry] ${data.subject} - ${data.fullName}`);
    const emailBody = encodeURIComponent(
      `Name: ${data.fullName}\nEmail: ${data.email}\nService Interested: ${data.serviceInterest}\n\nMessage:\n${data.message}`
    );
    const mailtoUrl = `mailto:${recipient}?subject=${emailSubject}&body=${emailBody}`;

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f472b6', '#131d38', '#fb7185', '#38bdf8'],
    });

    setIsSubmitted(true);

    window.location.href = mailtoUrl;

    setTimeout(() => {
      reset();
      setIsSubmitted(false);
    }, 5000);
  };

  const copyToClipboard = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(fieldId);
      setTimeout(() => setCopiedField(null), 2500);
    });
  };

  return {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    onSubmit,
    errors,
    isSubmitting,
    isSubmitted,
    copiedField,
    copyToClipboard,
  };
};
