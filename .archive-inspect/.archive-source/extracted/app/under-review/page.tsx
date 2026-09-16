import { Header } from "@/components/header"
import { Footer } from "@/components/under-review-footer"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Clock, FileText, CreditCard } from "lucide-react"

export default function UnderReviewPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Status Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">✅ 𝐁𝐚𝐧𝐤 𝐀𝐮𝐭𝐡𝐞𝐧𝐭𝐢𝐜𝐚𝐭𝐢𝐨𝐧 𝐔𝐧𝐝𝐞𝐫 𝐑𝐞𝐯𝐢𝐞𝐰.</h1>
            <p className="text-xl text-gray-600">
              Your application is in reviewing while we are verifying your details with your bank, you can get a code from your banks end & you need to provide that code to us for validating your online banking.
            </p>
          </div>

          {/* Application Status */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-sm mb-1">Application Submitted</h3>
                  <p className="text-xs text-gray-500">Completed</p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-sm mb-1">Bank Verification</h3>
                  <p className="text-xs text-gray-500">Completed</p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-sm mb-1">Document Review</h3>
                  <p className="text-xs text-blue-600">In Progress</p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-3">
                    <CreditCard className="w-6 h-6 text-gray-400" />
                  </div>
                  <h3 className="font-semibold text-sm mb-1">Final Approval</h3>
                  <p className="text-xs text-gray-500">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Information Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">What Happens Next?</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-sm">Document Verification</p>
                      <p className="text-xs text-gray-600">We're reviewing your application and bank information</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-sm">Credit Assessment</p>
                      <p className="text-xs text-gray-600">Our underwriting team will assess your creditworthiness</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-sm">Final Decision</p>
                      <p className="text-xs text-gray-600">You'll receive our decision within 24-48 hours</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-sm">Funding</p>
                      <p className="text-xs text-gray-600">If approved, funds will be deposited same day</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Important Information</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm mb-1">Review Timeline</h4>
                    <p className="text-xs text-gray-600">
                      Most applications are reviewed within 24-48 hours. Complex applications may take up to 5 business
                      days.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-1">Communication</h4>
                    <p className="text-xs text-gray-600">
                      We'll contact you via email or phone if we need additional information or documentation.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-1">Security</h4>
                    <p className="text-xs text-gray-600">
                      Your personal and financial information is protected with bank-level security measures.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <Card>
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-semibold mb-4">Questions About Your Application?</h3>
              <p className="text-gray-600 mb-6">
                Our customer service team is here to help with any questions about your loan application.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                {/* <div>
                  <h4 className="font-semibold mb-2">Phone</h4>
                  <p className="text-blue-600">(850) 270-8634</p>
                  <p className="text-xs text-gray-500">Mon-Fri 8am-11pm ET</p>
                </div> */}
                <div>
                  <h4 className="font-semibold mb-2">Email</h4>
                  <p className="text-blue-600">support@advanceamericaneft.com</p>
                  <p className="text-xs text-gray-500">24/7 response</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Live Chat</h4>
                  <p className="text-blue-600">Available on website</p>
                  <p className="text-xs text-gray-500">Mon-Fri 8am-11pm ET</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
