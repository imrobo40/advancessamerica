export function WhyChooseSection() {
  const stats = [
    {
      number: "95%",
      title: "Customer Satisfaction Rate",
      description: "Our customers consistently rate us highly",
    },
    {
      number: "20",
      title: "Years of Lending Experience",
      description: "Decades of financial expertise at your service",
    },
    {
      number: "35%",
      title: "Increase in Loan Approvals",
      description: "Proven strategies that boost your financial standing",
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Why Choose Advance America</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-8 bg-white rounded-lg shadow-sm">
              <div className="text-5xl font-bold text-blue-600 mb-4">{stat.number}</div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">{stat.title}</h3>
              <div className="w-16 h-px bg-gray-300 mx-auto mb-4"></div>
              <p className="text-gray-600">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
