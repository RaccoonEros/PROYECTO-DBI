import reactive from 'vue'

export const store = reactive({
  params: {
    totalTickets: 0
  },
  tickets: []
})


export function getTickets(tickets) {
  tickets.forEach(ticket => {
    store.tickets.push(ticket)
  }) 
}

export function getTotalTickets(total) {
  store.params.totalTickets = total
}
