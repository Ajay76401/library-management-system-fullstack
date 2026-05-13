// Initial seed data matching the screenshots
export const initialData = {
  authors: [
    { id: 1, name: 'Haruki Murakami', nationality: 'Japanese', bio: 'Surreal modern fiction.', bookCount: 2 },
    { id: 2, name: 'Chimamanda Ngozi Adichie', nationality: 'Nigerian', bio: 'Contemporary literary fiction.', bookCount: 1 },
    { id: 3, name: 'Yuval Noah Harari', nationality: 'Israeli', bio: 'Historian and philosopher.', bookCount: 2 },
    { id: 4, name: 'Ursula K. Le Guin', nationality: 'American', bio: 'Speculative fiction master.', bookCount: 1 },
  ],
  publishers: [
    { id: 1, name: 'Vintage Books', location: 'New York', founded: 1954 },
    { id: 2, name: 'Penguin Random House', location: 'New York', founded: 1927 },
    { id: 3, name: 'HarperCollins', location: 'New York', founded: 1989 },
  ],
  books: [
    { id: 1, title: 'Kafka on the Shore', authorId: 1, authorName: 'Haruki Murakami', publisherId: 1, publisherName: 'Vintage Books', year: 2002, isbn: '978-1400079278', category: 'Fiction', totalCopies: 5, availableCopies: 3 },
    { id: 2, title: 'Norwegian Wood', authorId: 1, authorName: 'Haruki Murakami', publisherId: 1, publisherName: 'Vintage Books', year: 1987, isbn: '978-0375704024', category: 'Fiction', totalCopies: 4, availableCopies: 4 },
    { id: 3, title: 'Half of a Yellow Sun', authorId: 2, authorName: 'Chimamanda Ngozi Adichie', publisherId: 2, publisherName: 'Penguin Random House', year: 2006, isbn: '978-1400095209', category: 'Historical', totalCopies: 3, availableCopies: 2 },
    { id: 4, title: 'Sapiens', authorId: 3, authorName: 'Yuval Noah Harari', publisherId: 3, publisherName: 'HarperCollins', year: 2011, isbn: '978-0062316097', category: 'Non-Fiction', totalCopies: 6, availableCopies: 5 },
    { id: 5, title: 'The Left Hand of Darkness', authorId: 4, authorName: 'Ursula K. Le Guin', publisherId: 2, publisherName: 'Penguin Random House', year: 1969, isbn: '978-0441478125', category: 'Sci-Fi', totalCopies: 2, availableCopies: 1 },
    { id: 6, title: 'Homo Deus', authorId: 3, authorName: 'Yuval Noah Harari', publisherId: 3, publisherName: 'HarperCollins', year: 2016, isbn: '978-0062464347', category: 'Non-Fiction', totalCopies: 4, availableCopies: 4 },
  ],
  members: [
    { id: 1, name: 'Aria Patel', email: 'aria@example.com', phone: '+1 555 0101', status: 'Active', joinedDate: '2024-01-12', activeLoans: 1 },
    { id: 2, name: 'Liam Chen', email: 'liam@example.com', phone: '+1 555 0102', status: 'Active', joinedDate: '2024-03-04', activeLoans: 2 },
    { id: 3, name: 'Sofia Rossi', email: 'sofia@example.com', phone: '+1 555 0103', status: 'Active', joinedDate: '2023-11-21', activeLoans: 0 },
    { id: 4, name: 'Noah Williams', email: 'noah@example.com', phone: '+1 555 0104', status: 'Suspended', joinedDate: '2024-05-30', activeLoans: 0 },
  ],
  loans: [
    { id: 1, bookId: 1, bookTitle: 'Kafka on the Shore', memberId: 1, memberName: 'Aria Patel', issuedDate: '2026-04-22', dueDate: '2026-05-06', returnedDate: null, status: 'Overdue' },
    { id: 2, bookId: 3, bookTitle: 'Half of a Yellow Sun', memberId: 2, memberName: 'Liam Chen', issuedDate: '2026-05-07', dueDate: '2026-05-21', returnedDate: null, status: 'Issued' },
    { id: 3, bookId: 1, bookTitle: 'Kafka on the Shore', memberId: 2, memberName: 'Liam Chen', issuedDate: '2026-05-10', dueDate: '2026-05-24', returnedDate: null, status: 'Issued' },
    { id: 4, bookId: 5, bookTitle: 'The Left Hand of Darkness', memberId: 3, memberName: 'Sofia Rossi', issuedDate: '2026-04-10', dueDate: '2026-04-26', returnedDate: '2026-05-01', status: 'Returned' },
  ],
  fines: [
    { id: 1, loanId: 1, memberId: 1, memberName: 'Aria Patel', bookTitle: 'Kafka on the Shore', overdueDays: 7, amount: 7, paid: false },
    { id: 2, loanId: 4, memberId: 3, memberName: 'Sofia Rossi', bookTitle: 'The Left Hand of Darkness', overdueDays: 5, amount: 5, paid: true },
  ],
};
