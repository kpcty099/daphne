'use client'

import { useCallback, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
// @ts-expect-error - json2csv does not export TypeScript types natively
import { parse } from 'json2csv'

type Lead = {
  id: number
  name: string
  email: string
  phone: string
  project_type: string
  budget: string
  created_at: string
}

export default function AdminPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)

  const fetchLeads = useCallback(async () => {
    setLoading(true)
    /* 
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })
      
    if (data) setLeads(data)
    */
    // Placeholder data for demo
    setLeads([
      { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1234567890', project_type: 'Villa', budget: '$100k+', created_at: new Date().toISOString() },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+0987654321', project_type: 'Apartment', budget: '$50k - $100k', created_at: new Date().toISOString() }
    ])
    setLoading(false)
  }, [])

  useEffect(() => {
    // In a real app, you would add authentication check here
    queueMicrotask(() => void fetchLeads())
  }, [fetchLeads])

  const exportCSV = () => {
    try {
      const csv = parse(leads)
      const blob = new Blob([csv], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.setAttribute('hidden', '')
      a.setAttribute('href', url)
      a.setAttribute('download', 'leads.csv')
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button onClick={exportCSV} className="bg-white text-black hover:bg-gray-200">
            Export CSV
          </Button>
        </div>

        <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/50 border-b border-gray-800">
                <th className="p-4 font-medium text-gray-400">Name</th>
                <th className="p-4 font-medium text-gray-400">Email</th>
                <th className="p-4 font-medium text-gray-400">Phone</th>
                <th className="p-4 font-medium text-gray-400">Project</th>
                <th className="p-4 font-medium text-gray-400">Budget</th>
                <th className="p-4 font-medium text-gray-400">Date</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">Loading leads...</td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">No leads found.</td>
                </tr>
              ) : (
                leads.map((lead, i) => (
                  <tr key={i} className="border-b border-gray-800/50 hover:bg-gray-800/50 transition-colors">
                    <td className="p-4">{lead.name}</td>
                    <td className="p-4 text-gray-300">{lead.email}</td>
                    <td className="p-4 text-gray-300">{lead.phone}</td>
                    <td className="p-4">{lead.project_type}</td>
                    <td className="p-4 text-green-400">{lead.budget}</td>
                    <td className="p-4 text-gray-500 text-sm">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
