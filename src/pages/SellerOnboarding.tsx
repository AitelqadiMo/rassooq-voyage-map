import { useState, useEffect } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { sellerOnboardingSteps } from "@/data/rassooq-mock-data";
import { useToast } from "@/hooks/use-toast";
import { 
  ChevronRight, 
  ChevronLeft, 
  Upload, 
  FileText, 
  CreditCard, 
  Truck, 
  CheckCircle,
  Building2,
  MapPin,
  Phone,
  Mail,
  User,
  Store,
  Banknote
} from "lucide-react";

interface OnboardingData {
  businessName: string;
  businessType: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  commercialRegister: File | null;
  taxCertificate: File | null;
  identityDocument: File | null;
  bankStatement: File | null;
  bankName: string;
  accountNumber: string;
  iban: string;
  swiftCode: string;
  fulfillmentMethod: string;
  warehouseAddress: string;
  shippingRegions: string[];
  termsAccepted: boolean;
  privacyAccepted: boolean;
  commissionAccepted: boolean;
}

const initialData: OnboardingData = {
  businessName: "",
  businessType: "",
  contactPerson: "",
  email: "",
  phone: "",
  address: "",
  commercialRegister: null,
  taxCertificate: null,
  identityDocument: null,
  bankStatement: null,
  bankName: "",
  accountNumber: "",
  iban: "",
  swiftCode: "",
  fulfillmentMethod: "",
  warehouseAddress: "",
  shippingRegions: [],
  termsAccepted: false,
  privacyAccepted: false,
  commissionAccepted: false
};

const SellerOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<OnboardingData>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const progress = ((currentStep + 1) / sellerOnboardingSteps.length) * 100;

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field: string, file: File | null) => {
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  const isStepValid = (stepIndex: number): boolean => {
    const step = sellerOnboardingSteps[stepIndex];
    
    switch (step.id) {
      case 'business_info':
        return !!(formData.businessName && formData.businessType && 
                 formData.contactPerson && formData.email && 
                 formData.phone && formData.address);
      case 'documents':
        return !!(formData.commercialRegister && formData.taxCertificate && 
                 formData.identityDocument && formData.bankStatement);
      case 'banking':
        return !!(formData.bankName && formData.accountNumber && 
                 formData.iban && formData.swiftCode);
      case 'shipping':
        return !!(formData.fulfillmentMethod && 
                 (formData.fulfillmentMethod === 'rassooq' || formData.warehouseAddress) &&
                 formData.shippingRegions.length > 0);
      case 'contract':
        return formData.termsAccepted && formData.privacyAccepted && formData.commissionAccepted;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < sellerOnboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!isStepValid(currentStep)) {
      toast({
        title: "Incomplete Information",
        description: "Please fill in all required fields before proceeding.",
        variant: "destructive"
      });
      return;
    }

    if (currentStep === sellerOnboardingSteps.length - 1) {
      setIsSubmitting(true);
      
      // Simulate API submission
      setTimeout(() => {
        toast({
          title: "Application Submitted!",
          description: "Your seller application has been submitted for review. You'll receive an email within 2-3 business days.",
        });
        setIsSubmitting(false);
        // Redirect to dashboard or success page
      }, 2000);
    } else {
      handleNext();
    }
  };

  const renderStepContent = () => {
    const step = sellerOnboardingSteps[currentStep];

    switch (step.id) {
      case 'business_info':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name *</Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="businessName"
                    placeholder="Enter your business name"
                    value={formData.businessName}
                    onChange={(e) => handleInputChange('businessName', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="businessType">Business Type *</Label>
                <Select 
                  value={formData.businessType} 
                  onValueChange={(value) => handleInputChange('businessType', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="company">Company (SARL/SA)</SelectItem>
                    <SelectItem value="cooperative">Cooperative</SelectItem>
                    <SelectItem value="association">Association</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactPerson">Contact Person *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="contactPerson"
                    placeholder="Full name of contact person"
                    value={formData.contactPerson}
                    onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="business@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    placeholder="+212 6 XX XX XX XX"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Business Address *</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Textarea
                  id="address"
                  placeholder="Enter complete business address with postal code"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="pl-10 min-h-20"
                />
              </div>
            </div>
          </div>
        );

      case 'documents':
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <FileText className="inline h-4 w-4 mr-2" />
                Please upload clear, readable copies of the following documents. All documents must be valid and current.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[ 
                { key: 'commercialRegister', label: 'Commercial Register (RC)', required: true },
                { key: 'taxCertificate', label: 'Tax Certificate', required: true },
                { key: 'identityDocument', label: 'ID Card/Passport', required: true },
                { key: 'bankStatement', label: 'Bank Statement', required: true }
              ].map(doc => (
                <div key={doc.key} className="space-y-2">
                  <Label htmlFor={`file-${doc.key}`}>{doc.label} {doc.required && '*'}</Label>
                  <div className="relative border-2 border-dashed border-muted rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">
                      <label htmlFor={`file-${doc.key}`} className="cursor-pointer underline">Click to upload</label> or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PDF, JPG, PNG up to 10MB
                    </p>
                    <input
                      id={`file-${doc.key}`}
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload(doc.key, e.target.files?.[0] || null)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    {formData[doc.key as keyof OnboardingData] && (
                      <Badge className="mt-2" variant="outline">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        File uploaded
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'banking':
        return (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-800">
                <CreditCard className="inline h-4 w-4 mr-2" />
                Banking information is required for payout processing. All information is encrypted and secure.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="bankName">Bank Name *</Label>
                <Select 
                  value={formData.bankName} 
                  onValueChange={(value) => handleInputChange('bankName', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your bank" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="attijariwafa">Attijariwafa Bank</SelectItem>
                    <SelectItem value="bmce">BMCE Bank</SelectItem>
                    <SelectItem value="cih">CIH Bank</SelectItem>
                    <SelectItem value="bp">Banque Populaire</SelectItem>
                    <SelectItem value="cdm">Crédit du Maroc</SelectItem>
                    <SelectItem value="sgmb">SGMB</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="accountNumber">Account Number *</Label>
                <div className="relative">
                  <Banknote className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="accountNumber"
                    placeholder="Enter account number"
                    value={formData.accountNumber}
                    onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="iban">IBAN *</Label>
                <Input
                  id="iban"
                  placeholder="MA64 0123 4567 8901 2345 6789 00"
                  value={formData.iban}
                  onChange={(e) => handleInputChange('iban', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="swiftCode">SWIFT/BIC Code *</Label>
                <Input
                  id="swiftCode"
                  placeholder="e.g., ATMA MA MC"
                  value={formData.swiftCode}
                  onChange={(e) => handleInputChange('swiftCode', e.target.value)}
                />
              </div>
            </div>
          </div>
        );

      case 'shipping':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label>Fulfillment Method *</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    id: 'rassooq',
                    title: 'Fulfilled by Rassooq',
                    description: 'We handle storage, packing, and shipping',
                    benefits: ['Free storage', 'Prime delivery', 'Customer service']
                  },
                  {
                    id: 'seller',
                    title: 'Self-Fulfilled',
                    description: 'You handle storage, packing, and shipping',
                    benefits: ['Full control', 'Direct customer contact', 'Lower fees']
                  }
                ].map(method => (
                  <div key={method.id} className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                    formData.fulfillmentMethod === method.id ? 'border-primary bg-primary/5' : 'border-muted'
                  }`} onClick={() => handleInputChange('fulfillmentMethod', method.id)}>
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        checked={formData.fulfillmentMethod === method.id}
                        onChange={() => handleInputChange('fulfillmentMethod', method.id)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{method.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{method.description}</p>
                        <ul className="text-xs space-y-1">
                          {method.benefits.map(benefit => (
                            <li key={benefit} className="flex items-center gap-1">
                              <CheckCircle className="h-3 w-3 text-green-500" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {formData.fulfillmentMethod === 'seller' && (
              <div className="space-y-2">
                <Label htmlFor="warehouseAddress">Warehouse/Store Address *</Label>
                <Textarea
                  id="warehouseAddress"
                  placeholder="Enter your warehouse or store address"
                  value={formData.warehouseAddress}
                  onChange={(e) => handleInputChange('warehouseAddress', e.target.value)}
                  className="min-h-20"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label>Shipping Regions *</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {[
                  'Casablanca-Settat', 'Rabat-Salé-Kénitra', 'Marrakech-Safi',
                  'Fès-Meknès', 'Tanger-Tétouan-Al Hoceima', 'Oriental',
                  'Souss-Massa', 'Drâa-Tafilalet', 'Béni Mellal-Khénifra',
                  'Laâyoune-Sakia El Hamra', 'Dakhla-Oued Ed-Dahab', 'Guelmim-Oued Noun'
                ].map(region => (
                  <div key={region} className="flex items-center space-x-2">
                    <Checkbox
                      id={region}
                      checked={formData.shippingRegions.includes(region)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          handleInputChange('shippingRegions', [...formData.shippingRegions, region]);
                        } else {
                          handleInputChange('shippingRegions', formData.shippingRegions.filter(r => r !== region));
                        }
                      }}
                    />
                    <Label htmlFor={region} className="text-sm">{region}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'contract':
        return (
          <div className="space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                Please review and accept the following terms to complete your registration.
              </p>
            </div>

            <div className="space-y-4">
              <div className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.termsAccepted}
                    onCheckedChange={(checked) => handleInputChange('termsAccepted', checked)}
                  />
                  <Label htmlFor="terms" className="text-sm leading-relaxed">
                    I agree to the <a href="/terms" className="text-primary hover:underline">Seller Terms & Conditions</a> and understand my obligations as a seller on the Rassooq platform.
                  </Label>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="privacy"
                    checked={formData.privacyAccepted}
                    onCheckedChange={(checked) => handleInputChange('privacyAccepted', checked)}
                  />
                  <Label htmlFor="privacy" className="text-sm leading-relaxed">
                    I acknowledge that I have read and agree to the <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a> regarding data processing and storage.
                  </Label>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="commission"
                    checked={formData.commissionAccepted}
                    onCheckedChange={(checked) => handleInputChange('commissionAccepted', checked)}
                  />
                  <Label htmlFor="commission" className="text-sm leading-relaxed">
                    I understand and accept the commission structure: 8-15% per sale (varies by category) plus payment processing fees of 2.9% + 3 MAD per transaction.
                  </Label>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium mb-2">What happens next?</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Your application will be reviewed within 2-3 business days</li>
                <li>• We'll verify your documents and business information</li>
                <li>• You'll receive an email with approval status and next steps</li>
                <li>• Once approved, you can start listing products immediately</li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Become a Rassooq Seller</h1>
              <p className="text-muted-foreground">Join thousands of sellers and grow your business</p>
            </div>
            <Badge variant="outline" className="text-sm">
              Step {currentStep + 1} of {sellerOnboardingSteps.length}
            </Badge>
          </div>
          
          <Progress value={progress} className="w-full h-2" />
          
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            {sellerOnboardingSteps.map((step, index) => (
              <span key={step.id} className={index <= currentStep ? 'text-primary font-medium' : ''}>
                {step.title}
              </span>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              {currentStep === 0 && <Building2 className="h-6 w-6 text-primary" />}
              {currentStep === 1 && <FileText className="h-6 w-6 text-primary" />}
              {currentStep === 2 && <CreditCard className="h-6 w-6 text-primary" />}
              {currentStep === 3 && <Truck className="h-6 w-6 text-primary" />}
              {currentStep === 4 && <CheckCircle className="h-6 w-6 text-primary" />}
              
              <div>
                <CardTitle>{sellerOnboardingSteps[currentStep].title}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {sellerOnboardingSteps[currentStep].description}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {renderStepContent()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || (currentStep !== 0 && currentStep !== sellerOnboardingSteps.length - 1 && !isStepValid(currentStep)) || (currentStep===1 && !isStepValid(currentStep))}
            className="flex items-center gap-2"
          >
            {isSubmitting ? (
              "Submitting..."
            ) : currentStep === sellerOnboardingSteps.length - 1 ? (
              "Submit Application"
            ) : (
              <>
                Next
                <ChevronRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SellerOnboarding;