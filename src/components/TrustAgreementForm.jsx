
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import SignatureCanvas from 'react-signature-canvas';
import { 
  FileText, 
  Check, 
  X, 
  Download, 
  RefreshCw, 
  Fingerprint, 
  Lock, 
  Shield, 
  UserCheck,
  LucideFingerprint
} from 'lucide-react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from './ui/card';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { ScrollArea } from './ui/scroll-area';
import { Alert, AlertTitle, AlertDescription } from './ui/alert';

const TrustAgreementForm = () => {
  const navigate = useNavigate();
  const [hasRead, setHasRead] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [controlNumber, setControlNumber] = useState('');
  const [rugId, setRugId] = useState(''); // This would come from the previous verification process
  const [agreementSigned, setAgreementSigned] = useState(false);
  const [userIdentityInfo, setUserIdentityInfo] = useState({
    fullName: 'John Doe', // This would be populated from the verification data
    idType: 'Passport',
    idNumber: 'P123456789',
    address: '123 Blockchain St, Crypto City, CC 12345'
  });

  // Signature pad reference
  const signaturePad = useRef(null);

  // Generate a random control number for the agreement
  const generateControlNumber = () => {
    const timestamp = new Date().getTime().toString().slice(-8);
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `AGR-${timestamp}-${random}`;
  };

  // Truncate long text
  const truncateText = (text, length) => {
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  // Initialize component
  React.useEffect(() => {
    // Generate control number when component mounts
    setControlNumber(generateControlNumber());
    
    // In a real application, you would fetch the RugID and user data here
    // For demo purposes, we'll set a sample RugID
    setRugId('RID-AB12CD34EF56');
    
    // Simulating loading user data from previous verification
    // In a real app, this would come from context, params, or an API
  }, []);

  const clearSignature = () => {
    signaturePad.current.clear();
    setAgreementSigned(false);
  };

  const handleSignAgreement = () => {
    if (signaturePad.current.isEmpty()) {
      toast.error('Please sign the agreement before submitting');
      return;
    }
    
    setAgreementSigned(true);
    toast.success('Agreement successfully signed!');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!hasRead) {
      toast.error('Please confirm that you have read and agree to the terms');
      return;
    }
    
    if (!agreementSigned) {
      toast.error('Please sign the agreement before submitting');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, you would:
      // 1. Generate a PDF of the signed agreement
      // 2. Store it securely
      // 3. Associate it with the user's RugID
      
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Trust Agreement successfully submitted!', {
        description: `Your RugID (${rugId}) has been finalized and is now active.`
      });
      
      // Navigate to success page or dashboard
      navigate('/');
    } catch (error) {
      console.error('Error submitting agreement:', error);
      toast.error('Failed to submit agreement. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // The trust agreement text - this would normally be loaded from a CMS or API
  const trustAgreementText = `
UNMASK PROTOCOL TRUST AGREEMENT

THIS TRUST AGREEMENT (the "Agreement") is entered into on the date of electronic signature below,

BETWEEN:

UNMASK PROTOCOL, a decentralized identity verification and fraud prevention protocol ("Unmask Protocol"),

AND

THE INDIVIDUAL OR ENTITY identified through the verification process and whose electronic signature appears below (the "Signatory").

WHEREAS:

A. Unmask Protocol provides a blockchain-based identity verification system that issues unique identifiers (RugIDs) to verified entities;

B. The Signatory wishes to obtain a RugID for use in Web3 projects after completing identity verification;

C. This Agreement establishes the terms under which the RugID is issued and the obligations of the Signatory.

NOW THEREFORE, in consideration of the mutual covenants contained herein, the parties agree as follows:

1. DEFINITIONS

1.1 "RugID" means the unique identifier issued by Unmask Protocol after successful identity verification.

1.2 "Verification Data" means the personal information provided by the Signatory during the identity verification process.

1.3 "Dead Man's Switch" means the security mechanism that protects Verification Data from unauthorized access.

1.4 "Control Number" means the unique tracking number assigned to this Agreement.

2. IDENTITY VERIFICATION AND RUGID ISSUANCE

2.1 The Signatory confirms that all Verification Data provided is true, accurate, and complete.

2.2 The Signatory acknowledges that the RugID is cryptographically derived from the Verification Data but cannot be reverse-engineered to reveal that data.

2.3 The Signatory agrees that the RugID will be publicly visible and associated with their Web3 projects.

3. TERMS OF USE

3.1 The Signatory shall not:
   (a) Transfer, sell, or otherwise distribute their RugID to any other party;
   (b) Use the RugID for any fraudulent, deceptive, or illegal purpose;
   (c) Attempt to create multiple RugIDs using different or false identities.

3.2 The Signatory shall notify Unmask Protocol immediately if they believe their RugID has been compromised.

4. DATA SECURITY AND PRIVACY

4.1 Unmask Protocol will store all Verification Data in secure, encrypted vaults protected by a Dead Man's Switch mechanism.

4.2 The Signatory's Verification Data will not be accessible to the public or to Unmask Protocol itself except under the conditions specified in Section 5.

4.3 Unmask Protocol will not sell, rent, or otherwise commercialize the Signatory's Verification Data.

5. LEGAL COMPLIANCE AND DISCLOSURE

5.1 The Signatory acknowledges that their Verification Data may be disclosed:
   (a) In response to a valid court order or subpoena;
   (b) To law enforcement agencies investigating fraud or other criminal activity;
   (c) As required by applicable laws and regulations.

5.2 Such disclosure shall only occur through the proper legal channels and with appropriate safeguards.

6. REPRESENTATIONS AND WARRANTIES

6.1 The Signatory represents and warrants that:
   (a) They have the legal capacity to enter into this Agreement;
   (b) They are at least 18 years of age or the age of majority in their jurisdiction;
   (c) They are not using the RugID to evade any legal obligations or to facilitate any illegal activity.

7. TERM AND TERMINATION

7.1 This Agreement shall remain in effect for as long as the Signatory's RugID remains active.

7.2 Unmask Protocol may revoke the Signatory's RugID if:
   (a) The Signatory breaches any provision of this Agreement;
   (b) The Signatory is found to have provided false Verification Data;
   (c) Required by law or court order.

8. LIMITATION OF LIABILITY

8.1 Unmask Protocol shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, arising out of or in connection with this Agreement.

8.2 In no event shall Unmask Protocol's total liability to the Signatory exceed the amount paid by the Signatory for the RugID issuance.

9. MISCELLANEOUS

9.1 This Agreement constitutes the entire agreement between the parties concerning the subject matter hereof.

9.2 This Agreement may not be modified except in writing signed by both parties.

9.3 The validity, interpretation, and performance of this Agreement shall be governed by the laws of the jurisdiction in which Unmask Protocol is established.

9.4 If any provision of this Agreement is found to be unenforceable, the remaining provisions shall remain in full force and effect.

BY ELECTRONICALLY SIGNING BELOW, THE SIGNATORY ACKNOWLEDGES THAT THEY HAVE READ AND UNDERSTOOD THIS AGREEMENT AND AGREE TO BE BOUND BY ITS TERMS.

[ELECTRONIC SIGNATURE SPACE]

Date: [CURRENT DATE]

RugID: [RUGID]

Control Number: [CONTROL NUMBER]
`;

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="bg-muted/50">
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary" />
          Unmask Protocol Trust Agreement
        </CardTitle>
        <CardDescription>
          Please review the agreement carefully before signing.
        </CardDescription>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent className="pt-6 space-y-6">
          {/* Agreement Text Display */}
          <div className="space-y-2">
            <Label className="text-lg">Agreement Terms</Label>
            <ScrollArea className="h-64 w-full border rounded-md p-4 bg-white text-black">
              <div className="whitespace-pre-line">
                {trustAgreementText.replace('[RUGID]', rugId).replace('[CONTROL NUMBER]', controlNumber).replace('[CURRENT DATE]', new Date().toLocaleDateString())}
              </div>
            </ScrollArea>
          </div>
          
          {/* User Identity Information Box */}
          <div className="space-y-2">
            <Label className="text-lg">Verified Identity Information</Label>
            <div className="border p-4 rounded-md bg-muted/20">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Full Name:</p>
                  <p className="text-sm">{userIdentityInfo.fullName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">ID Type:</p>
                  <p className="text-sm">{userIdentityInfo.idType}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">ID Number:</p>
                  <p className="text-sm">{truncateText(userIdentityInfo.idNumber, 5)}***</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Address:</p>
                  <p className="text-sm">{truncateText(userIdentityInfo.address, 20)}</p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-border/30 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Fingerprint className="h-4 w-4 text-primary" />
                  <span className="text-sm font-mono">RugID: {rugId}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-primary" />
                  <span className="text-sm font-mono">Control #: {controlNumber}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Signature Pad */}
          <div className="space-y-2">
            <Label className="text-lg">Signature</Label>
            <div className="border rounded-md bg-white p-1">
              <SignatureCanvas
                ref={signaturePad}
                penColor="black"
                canvasProps={{
                  width: 500,
                  height: 200,
                  className: 'signature-canvas w-full'
                }}
              />
            </div>
            <div className="flex gap-2">
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={clearSignature}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Clear Signature
              </Button>
              <Button 
                type="button" 
                size="sm"
                onClick={handleSignAgreement}
                disabled={agreementSigned}
              >
                <Check className="h-4 w-4 mr-2" />
                {agreementSigned ? 'Signed' : 'Sign Agreement'}
              </Button>
            </div>
          </div>
          
          {/* Confirmation Checkbox */}
          <div className="flex items-start space-x-2 pt-4 border-t">
            <Checkbox 
              id="agreement-confirmation" 
              checked={hasRead}
              onCheckedChange={(checked) => setHasRead(checked)}
            />
            <Label 
              htmlFor="agreement-confirmation" 
              className="font-normal"
            >
              I confirm that I have read and agree to the Trust Agreement terms, and that all identity information I have provided is accurate and truthful.
            </Label>
          </div>
          
          {/* Success Alert - shown when agreement is signed */}
          {agreementSigned && (
            <Alert className="bg-green-100 border-green-200">
              <Check className="h-4 w-4 text-green-600" />
              <AlertTitle>Agreement Signed</AlertTitle>
              <AlertDescription>
                Your signature has been recorded. Please submit the form to finalize the Trust Agreement.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-between bg-muted/50">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate('/')}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting || !hasRead || !agreementSigned}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Signed Agreement'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default TrustAgreementForm;
