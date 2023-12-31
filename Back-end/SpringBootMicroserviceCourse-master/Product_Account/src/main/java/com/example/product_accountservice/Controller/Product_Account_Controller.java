package com.example.product_accountservice.Controller;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.example.product_accountservice.Service.Product_Account_Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;

import com.example.commonservice.Model.Account;
import com.example.product_accountservice.Model.AccountRegister;
import com.example.product_accountservice.Model.Account_Product;
import com.example.commonservice.Model.Product;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/ProductAccount")
@CrossOrigin(origins = "http://localhost:3006/")
@Slf4j
public class Product_Account_Controller {

	@Autowired
	private WebClient.Builder webBuilder;
	@Autowired
	private Product_Account_Service service;
	
	@GetMapping("/demo")
	public List<Account_Product> demo(){
		Flux<Product> resultProduct = webBuilder.build().get()
                .uri("http://localhost:9000/product/getall")
                .retrieve()
                .bodyToFlux(Product.class);
		Flux<Account> resultAccount = webBuilder.build().get()
                .uri("http://localhost:9006/Account/GetAll")
                .retrieve()
                .bodyToFlux(Account.class);
		
		Map<Long, Account> personMap = resultAccount.toStream()
                .collect(Collectors.toMap(Account::getId, account -> account));
		//personMap.get(person.getAccountid()).getEmail()
		List<Account_Product> mergedDataList = resultProduct.toStream()
                .map(person -> new Account_Product(person.getId(),person.getAccountid() ,person.getName(), person.getDescription(), person.getCategory(), person.getImage(), personMap.get(person.getAccountid()).getEmail(), person.getPrice(),person.getApiimage() ,personMap.get(person.getAccountid()).getAvaterimage(), personMap.get(person.getAccountid()).getFullname()))
                .collect(Collectors.toList());
		return mergedDataList;
	}
	@GetMapping("/demo/{productid}")
	public List<Account_Product> getallProductId(@PathVariable Long productid){
		Flux<Product> resultProduct = webBuilder.build().get()
                .uri("http://localhost:9000/product/"+productid)
                .retrieve()
                .bodyToFlux(Product.class);
		Flux<Account> resultAccount = webBuilder.build().get()
                .uri("http://localhost:9006/Account/GetAll")
                .retrieve()
                .bodyToFlux(Account.class);
		
		Map<Long, Account> personMap = resultAccount.toStream()
                .collect(Collectors.toMap(Account::getId, account -> account));
		//personMap.get(person.getAccountid()).getEmail()
		List<Account_Product> mergedDataList = resultProduct.toStream()
                .map(person -> new Account_Product(person.getId(),person.getAccountid() ,person.getName(), person.getDescription(), person.getCategory(), person.getImage(), personMap.get(person.getAccountid()).getEmail(), person.getPrice(),person.getApiimage() ,personMap.get(person.getAccountid()).getAvaterimage(), personMap.get(person.getAccountid()).getFullname()))
                .collect(Collectors.toList());

		return mergedDataList;
	}
	//Lưu thông người đã đăng ký
	@PostMapping("/Post")
	public Mono<AccountRegister> registerCourse(@RequestBody AccountRegister accountRegister){
		log.info("register true");
		return service.registerProduct(accountRegister);
	}
	@GetMapping("/accountregister/{id}")
	public Flux<AccountRegister> productRegister(@PathVariable Long id){
		return service.getAllProductAccountRegistered(id);
	}
	@PostMapping("/registerproduct")
	public Mono<AccountRegister> register(AccountRegister accountRegister){
		return 	service.registerProduct(accountRegister);
	}
	@GetMapping("/demoapi")
	public void register(){
		log.info("register true");
	}
	@GetMapping("/product/{id}")
	public Flux<AccountRegister> accountRegister(@PathVariable Long id){
		return service.getAllProductAccountRegistered(id);
	}
}
