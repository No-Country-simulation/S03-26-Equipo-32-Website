import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createLeadSchema,
  type CreateLeadDto,
  type CreateLeadInput,
} from '@/core/leads/dto/create-lead.dto.ts';
import { leadContainer } from '@/core/containers/lead.container.ts';
import { useState } from 'react';

export const useLeadForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<CreateLeadInput>({
    resolver: zodResolver(createLeadSchema),
    defaultValues: {
      fullName: '',
      businessName: '',
      whatsapp: '',
      businessType: '',
      volumePurchase: '',
      foundUs: '',
      products: '',
      consent: false,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    setIsSubmitting(true);
    try {
      await leadContainer.createLead.execute(data as CreateLeadDto);
      setIsSuccess(true);
      form.reset();
    } finally {
      setIsSubmitting(false);
    }
  });

  return { form, onSubmit, isSubmitting, isSuccess };
};
