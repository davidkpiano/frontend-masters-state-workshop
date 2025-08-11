'use client';

import * as React from 'react';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Combobox } from '@/components/combobox';
import { locations } from '@/app/locations';
import { submitTravelDataBasic, type TravelData } from './actions';
import { CheckCircle } from 'lucide-react';

const seatPreferences = [
  { value: 'window', label: 'Window' },
  { value: 'aisle', label: 'Aisle' },
  { value: 'middle', label: 'Middle' },
];

type TravelFormData = {
  firstName: string;
  lastName: string;
  birthdate: string;
  passport: string;
  originCity: string;
  seatPreference: string;
};

export default function TravelFormPage() {
  // Form data state
  const [formData, setFormData] = useState<TravelFormData>({
    firstName: '',
    lastName: '',
    birthdate: '',
    passport: '',
    originCity: '',
    seatPreference: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successData, setSuccessData] = useState<TravelData | null>(null);

  const updateFormField = (field: keyof TravelFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);
    setErrors({});

    try {
      // Call simplified server action directly with form data
      const result = await submitTravelDataBasic(formData);

      if (result.status === 'success') {
        setIsSuccess(true);
        setSuccessData(result.data);
      } else if (result.status === 'error') {
        setErrors(result.errors);
      }
    } catch {
      setErrors({ general: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form
  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      birthdate: '',
      passport: '',
      originCity: '',
      seatPreference: '',
    });
    setIsSuccess(false);
    setSuccessData(null);
    setErrors({});
  };

  // Success screen
  if (isSuccess && successData) {
    return (
      <div className="max-w-2xl w-full mx-auto min-h-screen p-6">
        <Card className="border-green-200 bg-green-50 dark:bg-green-900/10 dark:border-green-800">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-600" />
            </div>
            <CardTitle className="text-green-800 dark:text-green-200">
              Travel Data Saved Successfully!
            </CardTitle>
            <CardDescription className="text-green-700 dark:text-green-300">
              Your travel information has been securely stored.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
              <h3 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">
                Submitted Information:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div>
                  <Label>Name:</Label>
                  {successData.firstName} {successData.lastName}
                </div>
                <div>
                  <Label>Birth Date:</Label>
                  {successData.birthdate}
                </div>
                <div>
                  <Label>Passport:</Label>
                  {successData.passport}
                </div>
                <div>
                  <Label>Origin:</Label>
                  {
                    locations.find(
                      (loc) => loc.value === successData.originCity
                    )?.label
                  }
                </div>
                <div className="md:col-span-2">
                  <Label>Seat Preference:</Label>
                  {
                    seatPreferences.find(
                      (seat) => seat.value === successData.seatPreference
                    )?.label
                  }
                </div>
              </div>
            </div>
            <Button onClick={handleReset} className="w-full" variant="outline">
              Submit Another Form
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl w-full mx-auto min-h-screen p-6">
      <Card>
        <CardHeader>
          <CardTitle>Travel Information Form</CardTitle>
          <CardDescription>
            Please provide your travel details for booking confirmation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => updateFormField('firstName', e.target.value)}
                  placeholder="Enter your first name"
                  aria-invalid={errors.firstName ? 'true' : 'false'}
                  disabled={isSubmitting}
                />
                {errors.firstName && (
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => updateFormField('lastName', e.target.value)}
                  placeholder="Enter your last name"
                  aria-invalid={errors.lastName ? 'true' : 'false'}
                  disabled={isSubmitting}
                />
                {errors.lastName && (
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthdate">Birth Date *</Label>
              <Input
                id="birthdate"
                name="birthdate"
                type="date"
                value={formData.birthdate}
                onChange={(e) => updateFormField('birthdate', e.target.value)}
                aria-invalid={errors.birthdate ? 'true' : 'false'}
                disabled={isSubmitting}
              />
              {errors.birthdate && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {errors.birthdate}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="passport">Passport Number *</Label>
              <Input
                id="passport"
                name="passport"
                type="text"
                value={formData.passport}
                onChange={(e) => updateFormField('passport', e.target.value)}
                placeholder="Enter your passport number"
                aria-invalid={errors.passport ? 'true' : 'false'}
                disabled={isSubmitting}
              />
              {errors.passport && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {errors.passport}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="originCity">Origin City *</Label>
              <Combobox
                options={locations}
                value={formData.originCity}
                onChange={(value: string) =>
                  updateFormField('originCity', value)
                }
                name="originCity"
                placeholder="Select your departure city"
              />
              {errors.originCity && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {errors.originCity}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="seatPreference">Seat Preference *</Label>
              <Combobox
                options={seatPreferences}
                value={formData.seatPreference}
                onChange={(value: string) =>
                  updateFormField('seatPreference', value)
                }
                name="seatPreference"
                placeholder="Select your seat preference"
              />
              {errors.seatPreference && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {errors.seatPreference}
                </p>
              )}
            </div>

            {errors.general && (
              <div className="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-md">
                <p className="text-sm text-red-600 dark:text-red-400">
                  {errors.general}
                </p>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                'Submit Travel Information'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
