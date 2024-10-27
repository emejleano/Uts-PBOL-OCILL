package com.example.library.controller;

import com.example.library.model.LoanTransaction;
import com.example.library.model.Book;
import com.example.library.model.Member;
import com.example.library.repository.LoanTransactionRepository;
import com.example.library.repository.BookRepository;
import com.example.library.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/transactions")
public class LoanTransactionController {

    @Autowired
    private LoanTransactionRepository loanTransactionRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private MemberRepository memberRepository;

    @GetMapping
    public List<LoanTransaction> getAllTransactions() {
        return loanTransactionRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<LoanTransaction> getTransactionById(@PathVariable Long id) {
        Optional<LoanTransaction> transaction = loanTransactionRepository.findById(id);
        return transaction.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<LoanTransaction> createTransaction(@RequestBody LoanTransaction transactionDetails) {
        Optional<Book> book = bookRepository.findById(transactionDetails.getBook().getId());
        Optional<Member> member = memberRepository.findById(transactionDetails.getMember().getId());

        if (book.isPresent() && member.isPresent()) {
            transactionDetails.setBook(book.get());
            transactionDetails.setMember(member.get());
            LoanTransaction transaction = loanTransactionRepository.save(transactionDetails);
            return ResponseEntity.ok(transaction);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<LoanTransaction> updateTransaction(@PathVariable Long id, @RequestBody LoanTransaction transactionDetails) {
        Optional<LoanTransaction> transaction = loanTransactionRepository.findById(id);

        if (transaction.isPresent()) {
            LoanTransaction updatedTransaction = transaction.get();
            Optional<Book> book = bookRepository.findById(transactionDetails.getBook().getId());
            Optional<Member> member = memberRepository.findById(transactionDetails.getMember().getId());

            if (book.isPresent() && member.isPresent()) {
                updatedTransaction.setBook(book.get());
                updatedTransaction.setMember(member.get());
                updatedTransaction.setBorrowDate(transactionDetails.getBorrowDate());
                updatedTransaction.setReturnDate(transactionDetails.getReturnDate());
                return ResponseEntity.ok(loanTransactionRepository.save(updatedTransaction));
            }
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTransaction(@PathVariable Long id) {
        Optional<LoanTransaction> transaction = loanTransactionRepository.findById(id);
        if (transaction.isPresent()) {
            loanTransactionRepository.delete(transaction.get());
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
