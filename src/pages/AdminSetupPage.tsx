import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Shield, CheckCircle } from 'lucide-react';

export default function AdminSetupPage() {
  return (
    <div className="min-h-screen p-6">
      <div className="container max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <Shield className="h-16 w-16 text-primary mx-auto mb-4 " />
          <h1 className="text-3xl font-bold v56-gradient-text mb-2">Admin Setup Guide</h1>
          <p className="text-muted-foreground">Follow these steps to set up your admin account</p>
        </div>

        <Alert className="border-primary/20 bg-primary/5">
          <CheckCircle className="h-4 w-4 text-primary" />
          <AlertTitle>Automatic Admin Assignment</AlertTitle>
          <AlertDescription>
            The first user to register will automatically be assigned the admin role.
          </AlertDescription>
        </Alert>

        <Card className="v56-glass premium-border">
          <CardHeader>
            <CardTitle>Setup Steps</CardTitle>
            <CardDescription>Complete these steps to access the admin panel</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary font-bold">1</span>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Register Your Account</h3>
                <p className="text-sm text-muted-foreground">
                  Go to the signup page and create your account. The first registered user will automatically become the admin.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary font-bold">2</span>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Verify Your Email</h3>
                <p className="text-sm text-muted-foreground">
                  Check your email inbox for the verification link and confirm your email address.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary font-bold">3</span>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Login to Your Account</h3>
                <p className="text-sm text-muted-foreground">
                  Use your credentials to login. You will see the Admin menu in the navigation bar.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary font-bold">4</span>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Access Admin Panel</h3>
                <p className="text-sm text-muted-foreground">
                  Click on your profile dropdown and select "Admin Panel" to access all admin features.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="v56-glass premium-border">
          <CardHeader>
            <CardTitle>Admin Features</CardTitle>
            <CardDescription>What you can do as an admin</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                <span>Manage users and assign roles</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                <span>Approve or reject deposit requests</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                <span>Process withdrawal requests</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                <span>Verify KYC documents</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                <span>Manage support tickets</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                <span>Edit Terms & Conditions and Privacy Policy</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                <span>View platform statistics and analytics</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
